import type { FastifyRequest, FastifyReply } from 'fastify';
import { randomUUID } from 'crypto';
import { hash as argonHash } from 'argon2';
import { z } from 'zod';
import { handleRouteError, sendNotFound, toBool, formatAdminUserRow } from '../_shared';
import { sendPasswordChangedMail } from '../mail';
import {
  repoGetUserById,
  repoGetUserByEmail,
  repoCreateUser,
  repoAdminListUsers,
  repoAdminUpdateUser,
  repoAdminSetActive,
  repoAdminSetRoles,
  repoAdminSetPassword,
  repoAdminDeleteUser,
  repoAssignRole,
  repoEnsureProfileRow,
  repoCreatePasswordChangedNotification,
} from './repository';
import {
  adminListUsersQuery,
  adminUpdateUserBody,
  adminSetActiveBody,
  adminSetRolesBody,
  adminSetPasswordBody,
  adminRoleBody,
  adminMakeByEmailBody,
} from './admin.validation';
import {
  buildAdminUserPatch,
  formatAdminUserById,
  resolveAdminPasswordChangedUserName,
  resolveAdminRoleTarget,
} from './helpers';

/** POST /admin/users */
const adminCreateUserBody = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  full_name: z.string().min(1).optional().nullable(),
  phone: z.string().optional().nullable(),
  role: z.enum(['admin', 'editor', 'user']).optional().default('admin'),
});

export async function adminCreateUser(req: FastifyRequest, reply: FastifyReply) {
  try {
    const body = adminCreateUserBody.parse(req.body ?? {});
    const exists = await repoGetUserByEmail(body.email);
    if (exists) return reply.status(409).send({ error: { message: 'user_exists' } });

    const id = randomUUID();
    const password_hash = await argonHash(body.password);
    await repoCreateUser({
      id,
      email: body.email,
      password_hash,
      full_name: body.full_name ?? undefined,
      phone: body.phone ?? undefined,
    });
    await repoAssignRole(id, body.role);
    await repoEnsureProfileRow(id, {
      full_name: body.full_name ?? null,
      phone: body.phone ?? null,
    });

    const created = await formatAdminUserById(id);
    return reply.code(201).send(created);
  } catch (e) {
    return handleRouteError(reply, req, e, 'admin_create_user');
  }
}

/** GET /admin/users */
export async function adminListUsers(req: FastifyRequest, reply: FastifyReply) {
  try {
    const q = adminListUsersQuery.parse(req.query ?? {});
    const rows = await repoAdminListUsers(q);
    return reply.send(rows.map((u) => formatAdminUserRow(u, u.role)));
  } catch (e) {
    return handleRouteError(reply, req, e, 'admin_list_users');
  }
}

/** GET /admin/users/:id */
export async function adminGetUser(req: FastifyRequest, reply: FastifyReply) {
  try {
    const id = String((req.params as Record<string, string>).id);
    const user = await formatAdminUserById(id);
    if (!user) return sendNotFound(reply);
    return reply.send(user);
  } catch (e) {
    return handleRouteError(reply, req, e, 'admin_get_user');
  }
}

/** PATCH /admin/users/:id */
export async function adminUpdateUser(req: FastifyRequest, reply: FastifyReply) {
  try {
    const id = String((req.params as Record<string, string>).id);
    const body = adminUpdateUserBody.parse(req.body ?? {});

    const existing = await repoGetUserById(id);
    if (!existing) return sendNotFound(reply);

    const patch = buildAdminUserPatch(body);

    const updated = await repoAdminUpdateUser(id, patch);
    if (!updated) return sendNotFound(reply);
    const user = await formatAdminUserById(id);
    if (!user) return sendNotFound(reply);
    return reply.send(user);
  } catch (e) {
    return handleRouteError(reply, req, e, 'admin_update_user');
  }
}

/** POST /admin/users/:id/active */
export async function adminSetUserActive(req: FastifyRequest, reply: FastifyReply) {
  try {
    const id = String((req.params as Record<string, string>).id);
    const { is_active } = adminSetActiveBody.parse(req.body ?? {});
    const u = await repoGetUserById(id);
    if (!u) return sendNotFound(reply);
    await repoAdminSetActive(id, toBool(is_active));
    return reply.send({ ok: true });
  } catch (e) {
    return handleRouteError(reply, req, e, 'admin_set_active');
  }
}

/** POST /admin/users/:id/roles */
export async function adminSetUserRoles(req: FastifyRequest, reply: FastifyReply) {
  try {
    const id = String((req.params as Record<string, string>).id);
    const { roles } = adminSetRolesBody.parse(req.body ?? {});
    const u = await repoGetUserById(id);
    if (!u) return sendNotFound(reply);
    await repoAdminSetRoles(id, roles);
    return reply.send({ ok: true });
  } catch (e) {
    return handleRouteError(reply, req, e, 'admin_set_roles');
  }
}

/** POST /admin/users/:id/password */
export async function adminSetUserPassword(req: FastifyRequest, reply: FastifyReply) {
  try {
    const id = String((req.params as Record<string, string>).id);
    const { password } = adminSetPasswordBody.parse(req.body ?? {});
    const u = await repoGetUserById(id);
    if (!u) return sendNotFound(reply);

    await repoAdminSetPassword(id, password);

    try {
      await repoCreatePasswordChangedNotification(id, 'Hesap şifreniz yönetici tarafından güncellendi. Bu işlemi siz yapmadıysanız lütfen en kısa sürede bizimle iletişime geçin.');
    } catch (err) {
      req.log?.error?.(err, 'admin_password_change_notification_failed');
    }

    if (u.email) {
      const userName = resolveAdminPasswordChangedUserName(u);
      void sendPasswordChangedMail({ to: u.email, user_name: userName }).catch((err) => req.log?.error?.(err, 'admin_password_change_mail_failed'));
    }

    return reply.send({ ok: true });
  } catch (e) {
    return handleRouteError(reply, req, e, 'admin_set_password');
  }
}

/** DELETE /admin/users/:id */
export async function adminDeleteUser(req: FastifyRequest, reply: FastifyReply) {
  try {
    const id = String((req.params as Record<string, string>).id);
    const u = await repoGetUserById(id);
    if (!u) return sendNotFound(reply);
    await repoAdminDeleteUser(id);
    return reply.send({ ok: true });
  } catch (e) {
    return handleRouteError(reply, req, e, 'admin_delete_user');
  }
}

/** POST /auth/admin/roles — grant role (legacy endpoint) */
export async function adminGrantRole(req: FastifyRequest, reply: FastifyReply) {
  try {
    const body = adminRoleBody.parse(req.body ?? {});
    const target = await resolveAdminRoleTarget(body);
    if (!target) return sendNotFound(reply);
    await repoAssignRole(target.id, body.role);
    return reply.send({ ok: true });
  } catch (e) {
    return handleRouteError(reply, req, e, 'admin_grant_role');
  }
}

/** POST /auth/admin/make-admin — make user admin by email (legacy endpoint) */
export async function adminMakeByEmail(req: FastifyRequest, reply: FastifyReply) {
  try {
    const body = adminMakeByEmailBody.parse(req.body ?? {});
    const u = await repoGetUserByEmail(body.email);
    if (!u) return sendNotFound(reply);
    await repoAssignRole(u.id, 'admin');
    return reply.send({ ok: true });
  } catch (e) {
    return handleRouteError(reply, req, e, 'admin_make_by_email');
  }
}

// ===================================================================
// FILE: src/modules/footerSections/admin.controller.ts
// ===================================================================

import type { RouteHandler } from "fastify";
import { db } from "@/db/client";
import { footerSections, footerSectionsI18n } from "./schema";
import { eq, and } from "drizzle-orm";

export const listFooterSectionsAdmin: RouteHandler = async (req, reply) => {
  try {
    const q = req.query as { locale?: string };
    const locale = q.locale || "tr";

    const rows = await db
      .select({
        id: footerSections.id,
        is_active: footerSections.is_active,
        display_order: footerSections.display_order,
        title: footerSectionsI18n.title,
        slug: footerSectionsI18n.slug,
        description: footerSectionsI18n.description,
      })
      .from(footerSections)
      .leftJoin(footerSectionsI18n, and(
        eq(footerSectionsI18n.section_id, footerSections.id),
        eq(footerSectionsI18n.locale, locale)
      ))
      .orderBy(footerSections.display_order);

    return reply.send({ items: rows, total: rows.length });
  } catch (err) {
    req.log.error({ err }, "list_footer_sections_admin_failed");
    return reply.code(500).send({ error: { message: "list_footer_sections_admin_failed" } });
  }
};

export const getFooterSectionAdmin: RouteHandler = async (req, reply) => {
  return reply.send({}); // Placeholder
};

export const createFooterSectionAdmin: RouteHandler = async (req, reply) => {
  return reply.code(201).send({}); // Placeholder
};

export const updateFooterSectionAdmin: RouteHandler = async (req, reply) => {
  return reply.send({ ok: true }); // Placeholder
};

export const deleteFooterSectionAdmin: RouteHandler = async (req, reply) => {
  return reply.code(204).send(); // Placeholder
};

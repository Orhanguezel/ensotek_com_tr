import { randomUUID } from 'crypto';
import type { RouteHandler } from 'fastify';
import { and, asc, eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '@/db/client';
import { faqs, faqsI18n } from './schema';

const boolLike = z.union([z.boolean(), z.literal(0), z.literal(1), z.literal('0'), z.literal('1'), z.literal('true'), z.literal('false')]);
const slug = z.string().min(1).max(255).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const createSchema = z.object({
  locale: z.string().min(2).max(10).default('tr'),
  question: z.string().trim().min(1).max(500),
  answer: z.string().min(1),
  slug,
  is_active: boolLike.optional().default(true),
  display_order: z.coerce.number().int().min(0).optional().default(0),
  category_id: z.string().uuid().nullable().optional(),
  sub_category_id: z.string().uuid().nullable().optional(),
});
const updateSchema = createSchema.partial().extend({ locale: z.string().min(2).max(10).default('tr') });
const to01 = (value: unknown) => value === true || value === 1 || value === '1' || value === 'true' ? 1 : 0;

async function getById(id: string, locale: string) {
  const [row] = await db.select({
    id: faqs.id, is_active: faqs.is_active, display_order: faqs.display_order,
    category_id: faqs.category_id, sub_category_id: faqs.sub_category_id,
    question: faqsI18n.question, answer: faqsI18n.answer, slug: faqsI18n.slug,
  }).from(faqs).leftJoin(faqsI18n, and(eq(faqsI18n.faq_id, faqs.id), eq(faqsI18n.locale, locale)))
    .where(eq(faqs.id, id)).limit(1);
  return row ?? null;
}

export const listFaqsAdmin: RouteHandler = async (req, reply) => {
  try {
    const locale = z.string().min(2).max(10).catch('tr').parse((req.query as { locale?: string }).locale);
    const rows = await db.select({
      id: faqs.id, is_active: faqs.is_active, display_order: faqs.display_order,
      category_id: faqs.category_id, sub_category_id: faqs.sub_category_id,
      question: faqsI18n.question, answer: faqsI18n.answer, slug: faqsI18n.slug,
    }).from(faqs).leftJoin(faqsI18n, and(eq(faqsI18n.faq_id, faqs.id), eq(faqsI18n.locale, locale)))
      .orderBy(asc(faqs.display_order));
    return reply.send({ items: rows, total: rows.length });
  } catch (err) {
    req.log.error({ err }, 'list_faqs_admin_failed');
    return reply.code(500).send({ error: { message: 'list_faqs_admin_failed' } });
  }
};

export const getFaqAdmin: RouteHandler = async (req, reply) => {
  const locale = z.string().min(2).max(10).catch('tr').parse((req.query as { locale?: string }).locale);
  const row = await getById((req.params as { id: string }).id, locale);
  return row ? reply.send(row) : reply.code(404).send({ error: { message: 'not_found' } });
};

export const createFaqAdmin: RouteHandler = async (req, reply) => {
  const parsed = createSchema.safeParse(req.body ?? {});
  if (!parsed.success) return reply.code(400).send({ error: { message: 'invalid_body', issues: parsed.error.issues } });
  const data = parsed.data;
  const id = randomUUID();
  try {
    await db.transaction(async (tx) => {
      await tx.insert(faqs).values({ id, is_active: to01(data.is_active), display_order: data.display_order, category_id: data.category_id, sub_category_id: data.sub_category_id });
      await tx.insert(faqsI18n).values({ id: randomUUID(), faq_id: id, locale: data.locale, question: data.question, answer: data.answer, slug: data.slug });
    });
    return reply.code(201).send(await getById(id, data.locale));
  } catch (err: any) {
    if (err?.code === 'ER_DUP_ENTRY') return reply.code(409).send({ error: { message: 'slug_already_exists' } });
    req.log.error({ err }, 'faqs_create_failed');
    return reply.code(500).send({ error: { message: 'faqs_create_failed' } });
  }
};

export const updateFaqAdmin: RouteHandler = async (req, reply) => {
  const { id } = req.params as { id: string };
  const parsed = updateSchema.safeParse(req.body ?? {});
  if (!parsed.success) return reply.code(400).send({ error: { message: 'invalid_body', issues: parsed.error.issues } });
  const data = parsed.data;
  if (!await getById(id, data.locale)) return reply.code(404).send({ error: { message: 'not_found' } });
  try {
    await db.transaction(async (tx) => {
      const parentPatch: Record<string, unknown> = {};
      if (data.is_active !== undefined) parentPatch.is_active = to01(data.is_active);
      if (data.display_order !== undefined) parentPatch.display_order = data.display_order;
      if (data.category_id !== undefined) parentPatch.category_id = data.category_id;
      if (data.sub_category_id !== undefined) parentPatch.sub_category_id = data.sub_category_id;
      if (Object.keys(parentPatch).length) await tx.update(faqs).set(parentPatch).where(eq(faqs.id, id));

      const [translation] = await tx.select({ id: faqsI18n.id }).from(faqsI18n)
        .where(and(eq(faqsI18n.faq_id, id), eq(faqsI18n.locale, data.locale))).limit(1);
      const i18nPatch: Record<string, unknown> = {};
      if (data.question !== undefined) i18nPatch.question = data.question;
      if (data.answer !== undefined) i18nPatch.answer = data.answer;
      if (data.slug !== undefined) i18nPatch.slug = data.slug;
      if (translation && Object.keys(i18nPatch).length) await tx.update(faqsI18n).set(i18nPatch).where(eq(faqsI18n.id, translation.id));
      if (!translation && Object.keys(i18nPatch).length) {
        if (!data.question || !data.answer || !data.slug) throw new Error('missing_required_translation_fields');
        await tx.insert(faqsI18n).values({ id: randomUUID(), faq_id: id, locale: data.locale, question: data.question, answer: data.answer, slug: data.slug });
      }
    });
    return reply.send(await getById(id, data.locale));
  } catch (err: any) {
    if (err?.message === 'missing_required_translation_fields') return reply.code(400).send({ error: { message: err.message } });
    if (err?.code === 'ER_DUP_ENTRY') return reply.code(409).send({ error: { message: 'slug_already_exists' } });
    req.log.error({ err }, 'faqs_update_failed');
    return reply.code(500).send({ error: { message: 'faqs_update_failed' } });
  }
};

export const deleteFaqAdmin: RouteHandler = async (req, reply) => {
  const { id } = req.params as { id: string };
  if (!await getById(id, 'tr')) return reply.code(404).send({ error: { message: 'not_found' } });
  await db.delete(faqs).where(eq(faqs.id, id));
  return reply.code(204).send();
};

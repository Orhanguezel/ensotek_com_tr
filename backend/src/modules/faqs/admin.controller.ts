// ===================================================================
// FILE: src/modules/faqs/admin.controller.ts
// ===================================================================

import type { RouteHandler } from "fastify";
import { db } from "@/db/client";
import { faqs, faqsI18n } from "./schema";
import { eq, and } from "drizzle-orm";

export const listFaqsAdmin: RouteHandler = async (req, reply) => {
  try {
    const q = req.query as { locale?: string };
    const locale = q.locale || "tr";

    const rows = await db
      .select({
        id: faqs.id,
        is_active: faqs.is_active,
        display_order: faqs.display_order,
        question: faqsI18n.question,
        answer: faqsI18n.answer,
        slug: faqsI18n.slug,
      })
      .from(faqs)
      .leftJoin(faqsI18n, and(
        eq(faqsI18n.faq_id, faqs.id),
        eq(faqsI18n.locale, locale)
      ))
      .orderBy(faqs.display_order);

    return reply.send({ items: rows, total: rows.length });
  } catch (err) {
    req.log.error({ err }, "list_faqs_admin_failed");
    return reply.code(500).send({ error: { message: "list_faqs_admin_failed" } });
  }
};

export const getFaqAdmin: RouteHandler = async (req, reply) => {
  return reply.send({}); // Placeholder
};

export const createFaqAdmin: RouteHandler = async (req, reply) => {
  return reply.code(201).send({}); // Placeholder
};

export const updateFaqAdmin: RouteHandler = async (req, reply) => {
  return reply.send({ ok: true }); // Placeholder
};

export const deleteFaqAdmin: RouteHandler = async (req, reply) => {
  return reply.code(204).send(); // Placeholder
};

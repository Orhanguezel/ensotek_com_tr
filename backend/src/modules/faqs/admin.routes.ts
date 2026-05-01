// ===================================================================
// FILE: src/modules/faqs/admin.routes.ts
// ===================================================================

import type { FastifyInstance } from "fastify";
import {
  listFaqsAdmin,
  getFaqAdmin,
  createFaqAdmin,
  updateFaqAdmin,
  deleteFaqAdmin,
} from "./admin.controller";

const BASE = "/faqs";

export async function registerFaqsAdmin(app: FastifyInstance) {
  app.get(BASE, listFaqsAdmin);
  app.get(`${BASE}/:id`, getFaqAdmin);
  app.post(BASE, createFaqAdmin);
  app.put(`${BASE}/:id`, updateFaqAdmin);
  app.delete(`${BASE}/:id`, deleteFaqAdmin);
}

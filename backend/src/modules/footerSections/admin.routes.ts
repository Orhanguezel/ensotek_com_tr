// ===================================================================
// FILE: src/modules/footerSections/admin.routes.ts
// ===================================================================

import type { FastifyInstance } from "fastify";
import {
  listFooterSectionsAdmin,
  getFooterSectionAdmin,
  createFooterSectionAdmin,
  updateFooterSectionAdmin,
  deleteFooterSectionAdmin,
} from "./admin.controller";

const BASE = "/footer_sections";

export async function registerFooterSectionsAdmin(app: FastifyInstance) {
  app.get(BASE, listFooterSectionsAdmin);
  app.get(`${BASE}/:id`, getFooterSectionAdmin);
  app.post(BASE, createFooterSectionAdmin);
  app.put(`${BASE}/:id`, updateFooterSectionAdmin);
  app.delete(`${BASE}/:id`, deleteFooterSectionAdmin);
}

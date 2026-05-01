// ===================================================================
// FILE: src/modules/dashboard/admin.routes.ts
// Ensotek – Admin Dashboard Routes (Admin)
// ===================================================================

import type { FastifyInstance } from "fastify";
import { getDashboardSummaryAdmin } from "./admin.controller";

const BASE = "/dashboard";

export async function registerDashboardAdmin(app: FastifyInstance) {
  // GET /api/admin/dashboard/summary
  // Not: requireAuth/requireAdmin hooks are applied at the parent level in routes.ts
  app.get(`${BASE}/summary`, getDashboardSummaryAdmin);
}

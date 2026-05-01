// ===================================================================
// FILE: src/modules/theme/admin.routes.ts
// ===================================================================

import type { FastifyInstance } from "fastify";
import { adminGetTheme, adminUpdateTheme, adminResetTheme } from "./admin.controller";

const BASE = "/theme";

export async function registerThemeAdmin(app: FastifyInstance) {
  app.get(BASE, adminGetTheme);
  app.put(BASE, adminUpdateTheme);
  app.post(`${BASE}/reset`, adminResetTheme);
}

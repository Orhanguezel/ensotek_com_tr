// ===================================================================
// FILE: src/modules/theme/admin.controller.ts
// ===================================================================

import type { RouteHandler } from "fastify";
import { db } from "@/db/client";
import { themeConfig, THEME_ROW_ID } from "./schema";
import { DEFAULT_THEME } from "./defaults";
import { eq } from "drizzle-orm";

/** GET /admin/theme */
export const adminGetTheme: RouteHandler = async (req, reply) => {
  try {
    const rows = await db.select().from(themeConfig).where(eq(themeConfig.id, THEME_ROW_ID)).limit(1);
    if (!rows[0]) return reply.send(DEFAULT_THEME);
    
    const config = typeof rows[0].config === 'string' ? JSON.parse(rows[0].config) : rows[0].config;
    return reply.send(config);
  } catch (err) {
    req.log.error({ err }, "admin_get_theme_failed");
    return reply.send(DEFAULT_THEME);
  }
};

/** PUT /admin/theme */
export const adminUpdateTheme: RouteHandler = async (req, reply) => {
  try {
    const body = req.body as any;
    
    // Get current
    const rows = await db.select().from(themeConfig).where(eq(themeConfig.id, THEME_ROW_ID)).limit(1);
    const current = rows[0] ? (typeof rows[0].config === 'string' ? JSON.parse(rows[0].config) : rows[0].config) : DEFAULT_THEME;
    
    // Merge
    const merged = { ...current, ...body };
    const jsonStr = JSON.stringify(merged);
    
    // Upsert
    if (rows[0]) {
      await db.update(themeConfig).set({ config: jsonStr }).where(eq(themeConfig.id, THEME_ROW_ID));
    } else {
      await db.insert(themeConfig).values({
        id: THEME_ROW_ID,
        config: jsonStr,
        is_active: 1
      });
    }
    
    return reply.send(merged);
  } catch (err) {
    req.log.error({ err }, "admin_update_theme_failed");
    return reply.code(500).send({ error: { message: "admin_update_theme_failed" } });
  }
};

/** GET /theme (Public) */
export const publicGetTheme: RouteHandler = async (req, reply) => {
  try {
    const rows = await db.select().from(themeConfig).where(eq(themeConfig.id, THEME_ROW_ID)).limit(1);
    if (!rows[0]) return reply.send(DEFAULT_THEME);
    
    const config = typeof rows[0].config === 'string' ? JSON.parse(rows[0].config) : rows[0].config;
    reply.header('cache-control', 'public, max-age=60');
    return reply.send(config);
  } catch (err) {
    return reply.send(DEFAULT_THEME);
  }
};

/** POST /admin/theme/reset */
export const adminResetTheme: RouteHandler = async (req, reply) => {
  try {
    const jsonStr = JSON.stringify(DEFAULT_THEME);
    await db.update(themeConfig).set({ config: jsonStr }).where(eq(themeConfig.id, THEME_ROW_ID));
    return reply.send(DEFAULT_THEME);
  } catch (err) {
    req.log.error({ err }, "admin_reset_theme_failed");
    return reply.code(500).send({ error: { message: "admin_reset_theme_failed" } });
  }
};

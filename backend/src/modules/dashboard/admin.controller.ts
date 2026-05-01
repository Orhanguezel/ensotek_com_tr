// ===================================================================
// FILE: src/modules/dashboard/admin.controller.ts
// Ensotek – Admin Dashboard Summary Controller
// ===================================================================

import type { RouteHandler } from "fastify";
import { pool } from "@/db/client";
import type { RowDataPacket } from "mysql2/promise";

type DashboardCountItem = {
  key: string;
  label: string;
  count: number;
};

type DashboardCountDef = {
  key: string;
  label: string;
  table: string;
};

const DASHBOARD_COUNT_DEFS: DashboardCountDef[] = [
  { key: "products", label: "Ürünler", table: "products" },
  { key: "categories", label: "Kategoriler", table: "categories" },
  { key: "subcategories", label: "Alt Kategoriler", table: "sub_categories" },
  { key: "services", label: "Hizmetler", table: "services" },
  { key: "faqs", label: "SSS", table: "faqs" },
  { key: "contacts", label: "İletişim Mesajları", table: "contact_messages" },
  { key: "newsletter", label: "Bülten Aboneleri", table: "newsletter_subscribers" },
  { key: "email_templates", label: "E-posta Şablonları", table: "email_templates" },
  { key: "site_settings", label: "Site Ayarları", table: "site_settings" },
  { key: "custom_pages", label: "Özel Sayfalar", table: "custom_pages" },
  { key: "menu_items", label: "Menü Öğeleri", table: "menu_items" },
  { key: "sliders", label: "Slider Öğeleri", table: "sliders" },
  { key: "footer_sections", label: "Footer Bölümleri", table: "footer_sections" },
  { key: "library", label: "Kütüphane / Library", table: "library" },
  { key: "reviews", label: "Yorumlar", table: "reviews" },
  { key: "support", label: "Destek Talepleri", table: "support_tickets" },
  { key: "users", label: "Kullanıcılar", table: "users" },
  { key: "offers", label: "Teklifler", table: "offers" },
  { key: "storage", label: "Depolama Öğeleri", table: "storage_assets" },
  { key: "references", label: "Referanslar", table: "references" },
  { key: "catalog_requests", label: "Katalog Talepleri", table: "lead_catalog_downloads" },
  { key: "audit", label: "Audit Kayıtları", table: "audit_request_logs" },
  { key: "chat", label: "Sohbet", table: "chat_threads" },
  { key: "telegram", label: "Telegram Mesajları", table: "telegram_inbound_messages" },
];

function quoteIdentifier(identifier: string): string {
  if (!/^[a-zA-Z0-9_]+$/.test(identifier)) {
    throw new Error(`invalid_identifier:${identifier}`);
  }

  return `\`${identifier}\``;
}

async function getExistingTables(): Promise<Set<string>> {
  const [rows] = await pool.query<RowDataPacket[]>("SHOW TABLES");
  const tables = new Set<string>();

  for (const row of rows) {
    for (const value of Object.values(row)) {
      if (typeof value === "string" && value) tables.add(value);
    }
  }

  return tables;
}

async function countTable(table: string, existingTables: Set<string>): Promise<number> {
  if (!existingTables.has(table)) return 0;

  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT COUNT(*) AS count_value FROM ${quoteIdentifier(table)}`
  );

  return Number(rows[0]?.count_value ?? 0);
}

/**
 * GET /admin/dashboard/summary
 * Global içerik özetini döndürür.
 */
export const getDashboardSummaryAdmin: RouteHandler = async (req, reply) => {
  try {
    const existingTables = await getExistingTables();
    const counts = await Promise.all(
      DASHBOARD_COUNT_DEFS.map((def) => countTable(def.table, existingTables))
    );
    const items: DashboardCountItem[] = DASHBOARD_COUNT_DEFS.map((def, index) => ({
      key: def.key,
      label: def.label,
      count: counts[index] ?? 0,
    }));

    return reply.send({ items });
  } catch (err) {
    req.log.error({ err }, "dashboard_summary_failed");
    return reply.code(500).send({ error: { message: "dashboard_summary_failed" } });
  }
};

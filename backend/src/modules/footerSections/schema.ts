// ===================================================================
// FILE: src/modules/footerSections/schema.ts
// ===================================================================

import {
  mysqlTable,
  char,
  varchar,
  int,
  datetime,
  index,
  uniqueIndex,
  customType,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

const longtext = customType<{ data: string | null; driverData: string | null }>({
  dataType() {
    return "longtext";
  },
});

export const footerSections = mysqlTable(
  "footer_sections",
  {
    id: char("id", { length: 36 }).primaryKey().notNull(),
    site_id: char("site_id", { length: 36 }),
    is_active: int("is_active").notNull().default(1),
    display_order: int("display_order").notNull().default(0),
    created_at: datetime("created_at", { fsp: 3 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(3)`),
    updated_at: datetime("updated_at", { fsp: 3 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(3)`),
  },
  (t) => [
    index("footer_sections_active_idx").on(t.is_active),
    index("footer_sections_order_idx").on(t.display_order),
  ]
);

export const footerSectionsI18n = mysqlTable(
  "footer_sections_i18n",
  {
    id: char("id", { length: 36 }).primaryKey().notNull(),
    section_id: char("section_id", { length: 36 })
      .notNull()
      .references(() => footerSections.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    locale: varchar("locale", { length: 10 }).notNull(),
    title: varchar("title", { length: 150 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    description: longtext("description"),
    created_at: datetime("created_at", { fsp: 3 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(3)`),
    updated_at: datetime("updated_at", { fsp: 3 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(3)`),
  },
  (t) => [
    uniqueIndex("ux_footer_sections_i18n_section_locale").on(t.section_id, t.locale),
    uniqueIndex("ux_footer_sections_i18n_locale_slug").on(t.locale, t.slug),
  ]
);

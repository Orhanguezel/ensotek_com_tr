// =============================================================
// FILE: src/integrations/endpoints/admin/theme_admin.endpoints.ts
// Theme admin hooks — wraps site_settings 'ui_admin_theme' key
// =============================================================

import { baseApi } from "@/integrations/baseApi";
import type { SettingValue } from "@/integrations/shared";

const ADMIN_BASE = "/admin/theme";

const extendedApi = baseApi.enhanceEndpoints({ addTagTypes: ["AdminTheme"] as const });

export const themeAdminApi = extendedApi.injectEndpoints({
  endpoints: (b) => ({
    getThemeAdmin: b.query<Record<string, unknown>, void>({
      query: () => ({ url: ADMIN_BASE }),
      providesTags: [{ type: "AdminTheme", id: "CURRENT" }],
    }),

    updateThemeAdmin: b.mutation<void, Record<string, unknown>>({
      query: (body) => ({
        url: ADMIN_BASE,
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "AdminTheme", id: "CURRENT" }],
    }),

    resetThemeAdmin: b.mutation<Record<string, unknown>, void>({
      query: () => ({
        url: `${ADMIN_BASE}/reset`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "AdminTheme", id: "CURRENT" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetThemeAdminQuery, useUpdateThemeAdminMutation, useResetThemeAdminMutation } = themeAdminApi;

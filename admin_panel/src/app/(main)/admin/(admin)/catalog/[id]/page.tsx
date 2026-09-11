// =============================================================
// FILE: src/app/(main)/admin/(admin)/catalog/[id]/page.tsx
// Admin Catalog Request Detail Page
// =============================================================

import AdminCatalogDetailClient from "../_components/admin-catalog-detail-client";

type Params = { id: string };

export default async function Page({ params }: { params: Promise<Params> | Params }) {
  const p = (await params) as Params;
  return <AdminCatalogDetailClient id={p.id} />;
}

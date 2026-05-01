// src/routes/shared.ts
// @ensotek/shared-backend modüllerini kullanarak tüm ortak route'ları kaydeder.
import type { FastifyInstance } from 'fastify';

// Auth & kullanıcı
import { registerAuth, registerUserAdmin } from '@ensotek/shared-backend/modules/auth';

// Dosya depolama
import { registerStorage, registerStorageAdmin } from '@ensotek/shared-backend/modules/storage';

// Kullanıcı profilleri
import { registerProfiles } from '@ensotek/shared-backend/modules/profiles';

// Site ayarları
import { registerSiteSettings, registerSiteSettingsAdmin } from '@ensotek/shared-backend/modules/siteSettings';

// Rol yönetimi
import { registerUserRoles } from '@ensotek/shared-backend/modules/userRoles';

// Health check
import { registerHealth } from '@ensotek/shared-backend/modules/health';

// Bildirimler
import { registerNotifications } from '@ensotek/shared-backend/modules/notifications';

// Audit log
import { registerAudit, registerAuditAdmin, registerAuditStream } from '@ensotek/shared-backend/modules/audit';

// İletişim formu
import { registerContacts, registerContactsAdmin } from '@ensotek/shared-backend/modules/contact';
import { registerCatalogRequests, registerCatalogRequestsAdmin } from '@ensotek/shared-backend/modules/catalogRequests';

// CMS sayfaları
import { registerCustomPages, registerCustomPagesAdmin } from '@ensotek/shared-backend/modules/customPages';

// Kategoriler & alt kategoriler
import { registerCategories } from '@ensotek/shared-backend/modules/categories/router';
import { registerCategoriesAdmin } from '@ensotek/shared-backend/modules/categories/admin.routes';
import { registerSubCategories } from '@ensotek/shared-backend/modules/subcategories/router';
import { registerSubCategoriesAdmin } from '@ensotek/shared-backend/modules/subcategories/admin.routes';

// Tema (Project-local)
import { registerThemeAdmin } from '../modules/theme/admin.routes';
import { publicGetTheme } from '../modules/theme/admin.controller';

// Telegram entegrasyonu
import { registerTelegram, registerTelegramAdmin } from '@ensotek/shared-backend/modules/telegram';

// Email şablonları (sadece admin)
import { registerEmailTemplatesAdmin } from '@ensotek/shared-backend/modules/emailTemplates/admin.routes';

// Ürünler (sogutma kulesi urunleri)
import { registerProducts } from '@ensotek/shared-backend/modules/products/router';
import { registerProductsAdmin } from '@ensotek/shared-backend/modules/products/admin.routes';

// Galeri
import { registerGallery } from '@ensotek/shared-backend/modules/gallery/router';
import { registerGalleryAdmin } from '@ensotek/shared-backend/modules/gallery/admin.routes';

// Referanslar (proje referanslari)
import { registerReferences } from '@ensotek/shared-backend/modules/references/router';
import { registerReferencesAdmin } from '@ensotek/shared-backend/modules/references/admin.routes';

// Yorumlar / testimonial'lar
import { registerReviews } from '@ensotek/shared-backend/modules/review/router';
import { registerReviewsAdmin } from '@ensotek/shared-backend/modules/review/admin.routes';

// Kütüphane (teknik dokumanlar, kataloglar)
import { registerLibrary } from '@ensotek/shared-backend/modules/library/router';
import { registerLibraryAdmin } from '@ensotek/shared-backend/modules/library/admin.routes';

// Newsletter (sadece admin route'u var, public subscribe endpoint yok)
import { registerNewsletterAdmin } from '@ensotek/shared-backend/modules/newsletter/admin.routes';

export async function registerSharedPublic(api: FastifyInstance) {
  await registerAuth(api);
  await registerHealth(api);
  await registerStorage(api);
  await registerProfiles(api);
  await registerSiteSettings(api);
  await registerUserRoles(api);
  await registerNotifications(api);
  await registerAudit(api);
  await registerContacts(api);
  await registerCatalogRequests(api);
  await registerCustomPages(api);
  await registerCategories(api);
  await registerSubCategories(api);
  await api.get('/theme', publicGetTheme);
  await registerTelegram(api);
  await registerProducts(api);
  await registerGallery(api);
  await registerReferences(api);
  await registerReviews(api);
  await registerLibrary(api);
}

export async function registerSharedAdmin(adminApi: FastifyInstance) {
  for (const reg of [
    registerSiteSettingsAdmin,
    registerUserAdmin,
    registerStorageAdmin,
    registerContactsAdmin,
    registerCatalogRequestsAdmin,
    registerCustomPagesAdmin,
    registerCategoriesAdmin,
    registerSubCategoriesAdmin,
    registerThemeAdmin,
    registerEmailTemplatesAdmin,
    registerAuditAdmin,
    registerAuditStream,
    registerTelegramAdmin,
    registerProductsAdmin,
    registerGalleryAdmin,
    registerReferencesAdmin,
    registerReviewsAdmin,
    registerLibraryAdmin,
    registerNewsletterAdmin,
    (await import('../modules/dashboard/admin.routes')).registerDashboardAdmin,
    (await import('../modules/footerSections/admin.routes')).registerFooterSectionsAdmin,
    (await import('../modules/faqs/admin.routes')).registerFaqsAdmin,
    (await import('@ensotek/shared-backend/modules/menuItems/admin.routes')).registerMenuItemsAdmin,
  ]) {
    await adminApi.register(reg);
  }

  const { aiContentAssist } = await import('@ensotek/shared-backend/modules/ai/content');
  adminApi.post('/ai/content', aiContentAssist);
}

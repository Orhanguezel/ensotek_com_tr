// src/routes.ts
import type { FastifyInstance } from 'fastify';
import { requireAuth } from '@agro/shared-backend/middleware/auth';
import { requireAdmin } from '@agro/shared-backend/middleware/roles';
import { registerSharedPublic, registerSharedAdmin } from './routes/shared';

export async function registerAllRoutes(app: FastifyInstance) {
  await app.register(async (api) => {
    // Admin routes — requireAuth + requireAdmin
    await api.register(async (adminApi) => {
      adminApi.addHook('onRequest', requireAuth);
      adminApi.addHook('onRequest', requireAdmin);
      await registerSharedAdmin(adminApi);
    }, { prefix: '/admin' });

    // Public routes
    await registerSharedPublic(api);
  }, { prefix: '/api' });
}

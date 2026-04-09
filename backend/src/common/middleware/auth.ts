// src/common/middleware/auth.ts
// Re-export from shared-backend for convenience
export { requireAuth } from '@agro/shared-backend/middleware/auth';
export { requireAdmin } from '@agro/shared-backend/middleware/roles';
export type { JwtUser } from '@/types/fastify-jwt';

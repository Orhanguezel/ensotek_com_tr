// src/common/middleware/auth.ts
// Re-export from shared-backend for convenience
export { requireAuth } from '@ensotek/shared-backend/middleware/auth';
export { requireAdmin } from '@ensotek/shared-backend/middleware/roles';
export type { JwtUser } from '@/types/fastify-jwt';

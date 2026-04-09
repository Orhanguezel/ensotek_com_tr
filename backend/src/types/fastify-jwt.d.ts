import 'fastify';
import '@fastify/jwt';

export interface JwtUser {
  sub?: string;
  email?: string;
  role?: string;
  roles?: string[];
  is_admin?: boolean;
  [k: string]: unknown;
}

declare module 'fastify' {
  interface FastifyRequest {
    user: JwtUser;
  }
}

import 'fastify';

declare module '@fastify/cookie' {
  import { FastifyPluginCallback } from 'fastify';

  export interface FastifyCookieOptions {
    secret?: string | string[];
    hook?: 'onRequest' | 'preParsing';
    parseOptions?: Record<string, unknown>;
  }

  const fastifyCookie: FastifyPluginCallback<FastifyCookieOptions>;
  export default fastifyCookie;
}

declare module 'fastify' {
  interface FastifyRequest {
    cookies: Record<string, string | undefined>;
  }
}

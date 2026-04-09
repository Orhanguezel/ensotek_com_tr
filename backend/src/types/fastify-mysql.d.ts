import 'fastify';

type MySQL = {
  query<T = unknown[]>(sql: string, params?: unknown[]): Promise<[T, unknown]>;
  execute<T = unknown>(sql: unknown): Promise<T>;
};

declare module 'fastify' {
  interface FastifyInstance {
    mysql: MySQL;
    db: MySQL;
    redis?: { ping(): Promise<string> };
  }
  interface FastifyRequest {
    mysql: MySQL;
  }
}

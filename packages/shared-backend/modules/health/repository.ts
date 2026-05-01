import type { FastifyInstance } from 'fastify';
import { sql } from 'drizzle-orm';

type HealthRuntime = FastifyInstance & {
  db: { execute(query: unknown): Promise<unknown> };
  redis?: { ping(): Promise<string> };
};

export async function repoCheckHealth(app: FastifyInstance) {
  const runtime = app as HealthRuntime;
  const rows = await runtime.db.execute(sql`SELECT 1 AS ok`);
  const first = Array.isArray(rows) ? rows[0] : (rows as any).rows?.[0];
  const dbOk = first?.ok === 1;
  const redisReply = runtime.redis ? await runtime.redis.ping().catch(() => 'FAIL') : 'SKIP';
  const redisOk = redisReply === 'PONG';

  return {
    status: dbOk && (runtime.redis ? redisOk : true) ? 'ok' : 'error',
    db: dbOk ? 'ok' : 'error',
    redis: runtime.redis ? (redisOk ? 'ok' : 'error') : 'disabled',
    uptime: process.uptime(),
  };
}

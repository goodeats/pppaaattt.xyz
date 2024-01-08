import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.enum(['production', 'development', 'test'] as const),
  DATABASE_URL: z.string(),
  SESSION_SECRET: z.string(),
});

type MyProcessEnv = z.infer<typeof schema>;

// added so session.server.ts wouldn't complain about env var not being defined
declare global {
  namespace NodeJS {
    interface ProcessEnv extends MyProcessEnv {}
  }
}

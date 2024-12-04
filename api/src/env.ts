import { z } from 'zod';

export const envSchema = z.object({
  ENV: z.string().default('dev'),
  DATABASE_URL: z.string().url(),
  KAFKA_BROKERS: z.string(),
  KAFKA_CONSUMER_GROUP_ID: z.string(),
  KAFKA_CLIENT_ID: z.string(),
  PORT: z.coerce.number().optional().default(3000),
});

export type Env = z.infer<typeof envSchema>;

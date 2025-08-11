import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

// dummy auth instance for generating schema
export const auth = betterAuth({
  database: drizzleAdapter({}, { provider: 'pg' }),
});

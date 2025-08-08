import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as authSchema from '../auth/schema';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DATABASE_CONNECTION,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: configService.getOrThrow('DB_CONNECTION_STRING'),
        });

        return drizzle(pool, { schema: { ...authSchema } });
      },
    },
  ],

  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}

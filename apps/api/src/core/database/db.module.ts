import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { DATABASE_CONNECTION } from 'src/core/database/db.connection';

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

        return drizzle(pool, { schema: {} });
      },
    },
  ],

  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}

import { AuthModule } from '@mguay/nestjs-better-auth';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import {
  DATABASE_CONNECTION,
  DatabaseModule,
} from 'src/core/database/db.module';
import { UsersModule } from './resources/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule.forRootAsync({
      imports: [DatabaseModule],
      useFactory: (database: NodePgDatabase) => ({
        auth: betterAuth({
          database: drizzleAdapter(database, { provider: 'pg' }),
        }),
      }),
      inject: [DATABASE_CONNECTION],
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

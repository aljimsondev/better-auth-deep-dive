import { AuthGuard, AuthModule } from '@mguay/nestjs-better-auth';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { TRUSTED_ORIGINS } from 'src/core/auth/trusted-origins';
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
      imports: [DatabaseModule, ConfigModule],
      useFactory: (database: NodePgDatabase, configService: ConfigService) => ({
        auth: betterAuth({
          database: drizzleAdapter(database, { provider: 'pg' }),
          trustedOrigins: [
            ...TRUSTED_ORIGINS,
            configService.getOrThrow('DEPLOYMENT_URL'),
            configService.getOrThrow('DEPLOYMENT_CLIENT_URL'),
          ],

          // enable email signin
          emailAndPassword: {
            enabled: true,
          },
          // enable social signin
          socialProviders: {
            github: {
              enabled: true,
              clientId: configService.getOrThrow('GITHUB_CLIENT_ID'),
              clientSecret: configService.getOrThrow('GITHUB_CLIENT_SECRET'),
            },
          },
        }),
      }),
      inject: [DATABASE_CONNECTION, ConfigService],
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}

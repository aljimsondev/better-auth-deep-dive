import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT ?? 3001;

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Better Auth API')
    .setDescription('A better-auth API implementation.')
    .setVersion('1.0')
    .addTag('better-auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use(
    '/docs',
    apiReference({
      content: document,
    }),
  );

  await app.listen(PORT);
  Logger.debug(`Documentation can be found in http://localhost:${PORT}/docs`);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DomainExceptionFilter } from './infra/http/filters/domain.filter';
import { setupSwagger } from './infra/http/config/swagger';
import { SerializeInterceptor } from './infra/http/interceptors/serializer.interceptor';
import { setupCors } from './infra/http/config/cors';
import { CoreExceptionFilter } from './infra/http/filters/core.filter';

export async function createApp() {
  const app = await NestFactory.create(AppModule);

  setupCors(app);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new DomainExceptionFilter());
  app.useGlobalFilters(new CoreExceptionFilter());

  app.useGlobalInterceptors(new SerializeInterceptor());

  if (process.env.NODE_ENV !== 'production') {
    setupSwagger(app);
  }

  return app;
}

async function bootstrap() {
  const app = await createApp();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

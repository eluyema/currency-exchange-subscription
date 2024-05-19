import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { validateEnvironmentVars } from './config/configuration';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  validateEnvironmentVars();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true, prefix: '/api' }),
  );
  const configService = app.get(ConfigService);

  const port = configService.get('server.port');
  const host = configService.get('server.host');

  await app.listen(port, host);
}
bootstrap();

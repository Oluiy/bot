import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.listen(process.env.SERVICE_PORT ?? 3000);
  console.log(`http://localhost:${process.env.SERVICE_PORT}`);

  process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await app.close();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('Shutting down gracefully...');
    await app.close();
    process.exit(0);
  });
}
bootstrap();

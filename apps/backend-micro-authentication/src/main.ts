import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.AUTHENTICATION_SERVICE_HOST ?? '0.0.0.0',
        port: parseInt(process.env.AUTHENTICATION_SERVICE_PORT ?? '5001', 5001),
      },
    },
  );

  await app.listen();
}
bootstrap();

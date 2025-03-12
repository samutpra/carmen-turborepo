import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.FILE_SERVICE_HOST ?? '0.0.0.0',
        port: parseInt(process.env.FILE_SERVICE_PORT ?? '5003', 5003),
      },
    },
  );
  await app.listen();
}
bootstrap();

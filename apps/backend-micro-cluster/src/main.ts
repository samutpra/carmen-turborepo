import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.CLUSTER_SERVICE_HOST ?? '0.0.0.0',
        port: parseInt(process.env.CLUSTER_SERVICE_PORT ?? '5002', 5002),
      },
    },
  );

  // const app = await NestFactory.create(AppModule);
  // app.enableCors();
  // app.setGlobalPrefix('api');
  // app.useGlobalPipes(new ValidationPipe());

  console.log(
    `Cluster service is running on ${process.env.CLUSTER_SERVICE_HOST}:${process.env.CLUSTER_SERVICE_PORT}`,
  );
  await app.listen();
}
bootstrap();

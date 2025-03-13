import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
async function bootstrap() {
  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.TCP,
        options: {
          host: process.env.AUTHENTICATION_SERVICE_HOST ?? '0.0.0.0',
          port: parseInt(
            process.env.AUTHENTICATION_SERVICE_PORT ?? '5001',
            5001,
          ),
        },
      },
    );

    const logger = new Logger('AuthenticationService');
    await app.listen();
    logger.log(
      `AuthenticationService is running on ${process.env.AUTHENTICATION_SERVICE_HOST ?? '0.0.0.0'}:${process.env.AUTHENTICATION_SERVICE_PORT ?? '5001'}`,
    );
  } catch (error) {
    const logger = new Logger('AuthenticationService');
    logger.error('Failed to start AuthenticationService', error);
    process.exit(1);
  }
}
bootstrap();

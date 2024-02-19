import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const shipmentTrackerMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'SHIPMENT_TRACKER_CLIENT',
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'hero-consumer',
        },
      },
    });

  await app.listen(3000);
  await shipmentTrackerMicroservice.listen();
}
bootstrap();

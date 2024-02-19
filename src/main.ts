import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const shipmentTrackerMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: configService.get('KAFKA_CLIENT_ID'),
          brokers: [
            configService.get('KAFKA_HOST') +
              ':' +
              configService.get('KAFKA_PORT'),
          ],
        },
        consumer: {
          groupId: configService.get('KAFKA_CONSUMER_GROUP_ID'),
        },
      },
    });

  await app.listen(3000);
  await shipmentTrackerMicroservice.listen();
}
bootstrap();

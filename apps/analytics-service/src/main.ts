import { NestFactory } from '@nestjs/core';
import { AnalyticsServiceModule } from './analytics-service.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AnalyticsServiceModule, {
      transport: Transport.KAFKA,
      options:{
        client:{
          clientId: 'analytics-service',
          brokers: [process.env.KAFKA_BROKER ?? ''],
        },
        consumer: {
          groupId: 'analytics-consumer-group',
        },
      }
  });
  await app.listen();
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { LoggingServiceModule } from './logging-service.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(LoggingServiceModule, {
   transport: Transport.RMQ,
   options: {
      urls: [process.env.RABBITMQ_URL],
      queue: 'logging_queue',
      queueOptions: {
        durable: true
      },
      exchange: 'user_events',
      exchangeType: 'fanout',
   }
  });
  await app.listen();
}
bootstrap();

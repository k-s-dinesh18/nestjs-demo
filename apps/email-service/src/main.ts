import { NestFactory } from '@nestjs/core';
import { EmailServiceModule } from './email-service.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(EmailServiceModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: 'email_queue',
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

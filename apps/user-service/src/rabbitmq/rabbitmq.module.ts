import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([{
            name: 'RABBITMQ_SERVICE',
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
                queue: 'user_queue',
                queueOptions: {
                    durable: true
                },
                exchange: 'user_events',
                exchangeType: 'fanout',
            },
        }])
    ],
    exports: [ClientsModule]
})
export class RabbitmqModule {
}
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { KafkaModule } from '../../../../libs/messaging/kafka/kafka.module';
import { RedisModule } from '../../../../libs/redis/redis.module';

@Module({
  imports: [
    KafkaModule,
    RedisModule
  ],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}

import { Module } from '@nestjs/common';
import { UserServiceController } from './user-service.controller';
import { UserServiceService } from './user-service.service';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { RedisModule } from '@redis/redis.module';
import { RabbitmqModule } from '@messaging/rabbitmq/rabbitmq.module';
import { KafkaModule } from '@messaging/kafka/kafka.module';

@Module({
  imports: [
    UsersModule,
    OrdersModule,
    RedisModule,
    RabbitmqModule,
    KafkaModule],
  controllers: [UserServiceController],
  providers: [UserServiceService],
})
export class UserServiceModule {}
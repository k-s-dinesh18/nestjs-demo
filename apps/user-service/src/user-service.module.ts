import { Module } from '@nestjs/common';
import { UserServiceController } from './user-service.controller';
import { UserServiceService } from './user-service.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './common/redis/redis.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { OrdersModule } from './orders/orders.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/user-service/.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DB_URI || ''),
    UsersModule,
    OrdersModule,
    AuthModule,
    RedisModule,
    RabbitmqModule,
    KafkaModule],
  controllers: [UserServiceController],
  providers: [UserServiceService],
})
export class UserServiceModule {}

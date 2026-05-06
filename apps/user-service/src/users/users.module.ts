import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RabbitmqModule } from 'libs/messaging/rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitmqModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
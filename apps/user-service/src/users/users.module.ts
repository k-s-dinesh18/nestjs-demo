import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RabbitmqModule } from 'libs/messaging/rabbitmq/rabbitmq.module';
import { UserRepository } from '@database/mongodb/repositories/user.repository';
import { MongoDbModule } from '@database/mongodb/mongodb.module';

@Module({
  imports: [RabbitmqModule, MongoDbModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
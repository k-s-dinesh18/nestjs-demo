import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users, userSchema } from './schema/users.schema';
import { RabbitmqModule } from 'apps/user-service/src/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: userSchema },
    ]),
    RabbitmqModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
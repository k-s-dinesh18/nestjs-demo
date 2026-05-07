import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { User, UserSchema } from './schemas/users.schema';
import { UserRepository } from './repositories/user.repository';
import { OrdersRepository } from './repositories/order.repository';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest_test'),

    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema},
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  providers: [UserRepository, OrdersRepository],
  exports: [MongooseModule, UserRepository, OrdersRepository],
})
export class MongoDbModule {}
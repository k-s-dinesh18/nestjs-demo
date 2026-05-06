import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { User, UserSchema } from './schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-demo'),

    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema},
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class MongoDbModule {}
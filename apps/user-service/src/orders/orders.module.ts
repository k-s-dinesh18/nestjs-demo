import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Orders, orderSchema } from './schema/order.schema';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Orders.name,
        schema: orderSchema,
      }
    ]),
    RabbitmqModule
  ],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}

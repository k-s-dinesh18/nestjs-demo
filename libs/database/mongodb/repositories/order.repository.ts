import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../schemas/order.schema';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectModel(Order.name)
    private model: Model<OrderDocument>,
    ) {}

    create(data: Partial<Order>) {
        return this.model.create(data);
    }

    findById(id: string) {
        return this.model.findById(id).exec();
    }

    findAll() {
        return this.model.find().lean().exec();
    }
}
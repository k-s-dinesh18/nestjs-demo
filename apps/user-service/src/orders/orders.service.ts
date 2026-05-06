import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientProxy } from '@nestjs/microservices';
import { Orders } from './schema/order.schema';
import mongoose, { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { RedisService } from '../common/redis/redis.service';


@Injectable()
export class OrdersService {
    constructor(
        @Inject('RABBITMQ_SERVICE')
        private rabbitMq: ClientProxy,

        @Inject('KAFKA_SERVICE')
        private kafkaClient: ClientProxy,

        @InjectModel(Orders.name)
        private model: Model<Orders>,

        private redisService: RedisService
    ){}

    async create(dto: CreateOrderDto){
        const order = await this.model.create(dto);

        await this.redisService.set(`order:${order.id}`, order, 60);
        // await this.rabbitMq.emit('order.created', order);
        await this.kafkaClient.emit('order.created', order);
        
        return order;
    }

    async findById(id: string){
        const valid = mongoose.isValidObjectId(id);
        if(!valid){
            throw new BadRequestException('Not a valid Id');
        }

        const cachedKey = `order:${id}`;
        const cachedOrder = await this.redisService.get<Orders>(id);
        if(cachedOrder){
            console.log('cached order - findById');
            return cachedOrder;
        }

        const order = await this.model.findById(id);
        if(!order){
            throw new NotFoundException('Id not found');
        }
        return order;
    }
    
    async findAll(){
        const cachedKey = 'orders:all';
        const cachedOrder = await this.redisService.get<Orders[]>(cachedKey);
        if(cachedOrder){
            console.log('cached orders - findAll');
            return cachedOrder;
        }
        const orders = await this.model.find().lean();
        await this.redisService.set(cachedKey, orders, 60);
        return orders;
    }
}

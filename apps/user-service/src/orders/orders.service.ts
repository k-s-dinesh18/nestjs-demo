import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Order } from '../../../../libs/database/mongodb/schemas/order.schema';
import mongoose from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { RedisService } from '../../../../libs/redis/redis.service';
import { OrdersRepository } from '@database/mongodb/repositories/order.repository';


@Injectable()
export class OrdersService {
    constructor(
        @Inject('KAFKA_SERVICE')
        private kafkaClient: ClientProxy,

        private ordersRepo: OrdersRepository,

        private redisService: RedisService
    ){}

    async create(dto: CreateOrderDto){
        const order = await this.ordersRepo.create(dto);

        await this.redisService.set(`order:${order.id}`, order, 60);
        await this.redisService.del('orders:all');
        
        this.kafkaClient.emit('order.created', order);

        return order;
    }

    async findById(id: string){
        const valid = mongoose.isValidObjectId(id);
        if(!valid){
            throw new BadRequestException('Not a valid Id');
        }

        const cachedKey = `order:${id}`;
        const cachedOrder = await this.redisService.get<Order>(cachedKey);
        if(cachedOrder){
            console.log('cached order - findById');
            return cachedOrder;
        }

        const order = await this.ordersRepo.findById(id);

        if(!order){
            throw new NotFoundException('Order Id not found');
        }

        await this.redisService.set(cachedKey, order, 60);
        return order;
    }
    
    async findAll(){
        const cachedKey = 'orders:all';
        const cachedOrder = await this.redisService.get<Order[]>(cachedKey);
        if(cachedOrder){
            console.log('cached orders - findAll');
            return cachedOrder;
        }
        const orders = await this.ordersRepo.findAll();

        await this.redisService.set(cachedKey, orders, 60);
        return orders;
    }
}

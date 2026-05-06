import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
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

        await this.redisService.set(`order:${order.id}`, JSON.stringify(order), 60);
        await this.rabbitMq.emit('order.created', order);
        await this.kafkaClient.emit('order.created', order);
    }

    async findById(id: string){
        const valid = mongoose.isValidObjectId(id);
        if(!valid){
            throw new BadRequestException('Not a valid Id');
        }

        const cachedKey = `order:${id}`;
        const cachedOrder = await this.redisService.get<Orders>(id);
        if(cachedOrder){
            return cachedOrder;
        }

        const order = await this.model.findById(id);
        if(!order){
            throw new NotFoundException('Id not found');
        }
        return order;
    }
    
    async findAll(){
        await this.model.find();
    }
}

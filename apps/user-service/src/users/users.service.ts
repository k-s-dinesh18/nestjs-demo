import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schema/users.schema';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { RedisService } from 'apps/user-service/src/common/redis/redis.service';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name)
        private model: mongoose.Model<Users>,        
        private redisClient: RedisService,

        @Inject('RABBITMQ_SERVICE')
        private client: ClientProxy
    ) {}

    async findAllUsers(query: Query): Promise<Users[]>{
        const filter = query.keyword ? {
            title: {
                $regex: query.keyword,
                $options: 'i'
            }
        } : {}

        const mongoQuery = this.model.find(filter);

        if(query.page)
        {
            const countPerPage : number = 2;
            const currentPage = Number (query.page) || 1;
            const skip = countPerPage * currentPage - 1;
            mongoQuery.limit(countPerPage).skip(skip);
        }
        return await mongoQuery.exec();
    }

    async findUserById(id: string): Promise<Users>{
        const isValid = mongoose.isValidObjectId(id);
        if(!isValid)
        {
            throw new BadRequestException('Not a valid ID');
        }
        const cacheKey = `user:${id}`;
        const cachedUser = await this.redisClient.get<Users>(cacheKey);
        if(cachedUser){ 
            console.log('cached order - findUserById');
            return cachedUser;
        };
        const user = await this.model.findById(id);
        if(!user)
        {
            throw new NotFoundException('User not found');  
        }
        await this.redisClient.set(cacheKey, JSON.stringify(user), 60);
        return user;
    }

    async create(user: Users): Promise<Users>{
        const result = await this.model.create(user);
        this.client.emit('user.created', {
            id: result.id,
            email: result.email
        });
        return result;
    } 

    async update(id: string, user: Users): Promise<Users>{
        const isValid = mongoose.isValidObjectId(id);
        if(!isValid)
        {
            throw new BadRequestException('Not a valid id');
        }
        const res =  await this.model.findByIdAndUpdate(id, user, 
        {
            new: true,
            runValidators: true
        });
        if(!res)
        {
            throw new NotFoundException('User not found');
        }
        this.client.emit('user.updated', {
            id: res.id
        });
        return res;
    }
    
    async delete(id: string): Promise<Users>{
        const isValid = mongoose.isValidObjectId(id);
        if(!isValid)
        {
            throw new BadRequestException('Not a valid id');
        }
        const res = await this.model.findByIdAndDelete(id);
        if(!res)
        {
            throw new NotFoundException('User not found');
        }
        this.client.emit('user.deleted', {
            id: res.id
        });
        return res;
    }
}

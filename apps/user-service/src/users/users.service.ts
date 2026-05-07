import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../../../libs/database/mongodb/repositories/user.repository';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { RedisService } from 'libs/redis/redis.service';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '@database/mongodb/schemas/users.schema';


@Injectable()
export class UsersService {
    constructor(  
        private readonly usersRepo: UserRepository,
        private redisClient: RedisService,

        @Inject('RABBITMQ_SERVICE')
        private client: ClientProxy
    ) {}

    async findAllUsers(query: Query){
        const filter = query.keyword
        ? {
            name: {
            $regex: query.keyword,
            $options: 'i',
            },
        }
        : {};

        let limit;
        let skip;
        let isCacheable = false;
        const cacheKey = 'users:all';
        if (query.page && query.limit) {
            const page = Number(query.page);
            limit = Number(query.limit);
            skip = (page - 1) * limit;
        }
        else{
            isCacheable = true;
            const cached = await this.redisClient.get<User[]>(cacheKey);
            if (cached) {
                console.log('users cache hit - get all users');
                return cached;
            }
        }


        const users = await this.usersRepo.findAll(filter, limit, skip);
        if (isCacheable) {
            await this.redisClient.set(cacheKey, users, 600);
        }
        return users;
    }

    async findUserById(id: string) {
        const isValid = mongoose.isValidObjectId(id);
        if(!isValid)
        {
            throw new BadRequestException('Not a valid ID');
        }
        const cacheKey = `user:${id}`;
        const cachedUser = await this.redisClient.get<User>(cacheKey);
        if(cachedUser){ 
            console.log('cached order - findUserById');
            return cachedUser;
        };
        const user = await this.usersRepo.findById(id);
        if(!user)
        {
            throw new NotFoundException('User not found');  
        }
        await this.redisClient.set(cacheKey, user, 600);
        return user;
    }

    async create(user: User) {
       const result = await this.usersRepo.create(user);

        this.client.emit('user.created', {
        id: result.id,
        email: result.email,
        });
        await this.redisClient.del('users:all');
        return result;
    } 

    async update(id: string, user: any) {
        if (!mongoose.isValidObjectId(id)) {
        throw new BadRequestException('Not a valid id');
        }

        const res = await this.usersRepo.update(id, user);
        const cacheKey = `user:${id}`;
        if (!res) {
            throw new NotFoundException('User not found');
        }
        await this.redisClient.del(cacheKey);
        await this.redisClient.del('users:all');

        await this.redisClient.set(cacheKey, user, 600)
        
        this.client.emit('user.updated', {
        id: res.id,
        });

        return res;
    }

    async delete(id: string) {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException('Not a valid id');
        }

        const res = await this.usersRepo.delete(id);

        if (!res) {
        throw new NotFoundException('User not found');
        }

        await this.redisClient.del(`user:${id}`);
        await this.redisClient.del('users:all');

        this.client.emit('user.deleted', {
        id: res.id,
        });

        return res;
  }
}
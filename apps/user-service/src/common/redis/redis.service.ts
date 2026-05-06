import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { REDIS_CLIENT } from './redis.constant';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy{
    constructor(
        @Inject(REDIS_CLIENT)
        private readonly redisClient: Redis        
    )
    {}

    async set(key: string, value: unknown, ttl?: number){
        const data = JSON.stringify(value);
        if(ttl){
            this.redisClient.set(key, data, 'EX', ttl);
        }else{
            this.redisClient.set(key, data);
        }
    }
    
    async get<T>(key: string): Promise<T | null>{
        const data = await this.redisClient.get(key);
        if(!data) return null;
        return JSON.parse(data) as T;
    }

    

    async del(key:string){
        await this.redisClient.del(key);
    }

    async reset(){
        await this.redisClient.flushall();
    }

    async onModuleDestroy() {
        await this.redisClient.quit();
    }
}

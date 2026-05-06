import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.constant';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: () => {
        return new Redis({
          host: 'localhost',
          port: 6379
        });
      }
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}

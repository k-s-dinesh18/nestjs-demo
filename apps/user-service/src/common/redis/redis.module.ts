import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { REDIS_CLIENT } from './redis.constant';
import Redis from 'ioredis';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: () => {
        new Redis({
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

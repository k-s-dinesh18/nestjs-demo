import { Module } from '@nestjs/common';
import { LoggingServiceController } from './logging-service.controller';
import { LoggingServiceService } from './logging-service.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Log, logSchema } from '../schema/log.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/logging-service/.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DB_URI || ''),
    MongooseModule.forFeature([{
      name: Log.name,
      schema: logSchema
    }])
  ],
  controllers: [LoggingServiceController],
  providers: [LoggingServiceService],
})
export class LoggingServiceModule {}

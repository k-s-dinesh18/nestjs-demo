  import { Module } from '@nestjs/common';
  import { AnalyticsServiceController } from './analytics-service.controller';
  import { AnalyticsServiceService } from './analytics-service.service';
  import { KafkaModule } from 'libs/messaging/kafka/kafka.module';
  import { ConfigModule } from '@nestjs/config';

  @Module({
    imports: [
      ConfigModule.forRoot({
        envFilePath: 'apps/analytics-service/.env',
        isGlobal: true
      }),
      KafkaModule],
    controllers: [AnalyticsServiceController],
    providers: [AnalyticsServiceService],
  })
  export class AnalyticsServiceModule {}

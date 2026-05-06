import { Module } from '@nestjs/common';
import { TimelineServiceController } from './timeline-service.controller';
import { TimelineServiceService } from './timeline-service.service';

@Module({
  imports: [],
  controllers: [TimelineServiceController],
  providers: [TimelineServiceService],
})
export class TimelineServiceModule {}

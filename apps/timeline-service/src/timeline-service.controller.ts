import { Controller, Get } from '@nestjs/common';
import { TimelineServiceService } from './timeline-service.service';

@Controller()
export class TimelineServiceController {
  constructor(private readonly timelineServiceService: TimelineServiceService) {}

  @Get()
  getHello(): string {
    return this.timelineServiceService.getHello();
  }
}

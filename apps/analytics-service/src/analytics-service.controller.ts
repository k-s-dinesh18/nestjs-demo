import { Controller, Get } from '@nestjs/common';
import { AnalyticsServiceService } from './analytics-service.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AnalyticsServiceController {
  constructor(private readonly analyticsService: AnalyticsServiceService) {}

  @EventPattern('order.created')
  handleOrderCreated(@Payload() data: any) {
    console.log('[Log] event received');
    this.analyticsService.handleOrderCreated(data);
  }
}

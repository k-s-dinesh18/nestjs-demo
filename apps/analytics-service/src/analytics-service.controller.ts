import { Controller, Get } from '@nestjs/common';
import { AnalyticsServiceService } from './analytics-service.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AnalyticsServiceController {
  constructor(private readonly analyticsService: AnalyticsServiceService) {}

  @EventPattern('order.created')
  handleOrderCreated(@Payload() message: any){
    const order = message.value;
    this.analyticsService.handleOrderCreated(order);
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsServiceService {
  private totalOrders = 0;
  private totalRevenue = 0;
  handleOrderCreated(order: any){
    this.totalOrders++;
    this.totalRevenue += order.amount;
    console.log('📊 Analytics Updated:', {
      totalOrders: this.totalOrders,
      totalRevenue: this.totalRevenue,
    });
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsServiceService {
  private totalOrders = 0;
  private totalRevenue = 0;
  handleOrderCreated(order: any){
    const amount = Number(order.amount);
    this.totalOrders++;
    this.totalRevenue += amount;
    console.log('📊 Analytics Updated:', {
      totalOrders: this.totalOrders,
      totalRevenue: this.totalRevenue,
    });
  }
}

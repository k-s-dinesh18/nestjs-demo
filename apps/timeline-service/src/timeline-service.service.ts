import { Injectable } from '@nestjs/common';

@Injectable()
export class TimelineServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}

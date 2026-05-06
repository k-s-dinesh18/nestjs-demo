import { Controller, Get } from '@nestjs/common';
import { LoggingServiceService } from './logging-service.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class LoggingServiceController {
  constructor(private readonly logservice: LoggingServiceService) {}

  @EventPattern('user.created')
  async handleCreate(@Payload() data: any){
    console.log('[LOG] user created');
    this.logservice.createLog('user.created', data);
  }

  @EventPattern('user.updated')
  async handleUpdate(@Payload() data: any){
     console.log('[LOG] user updated');
    this.logservice.createLog('user.updated', data);
  }
  
  @EventPattern('user.deleted')
  async handleDelete(@Payload() data: any){
     console.log('[LOG] user deleted');
    this.logservice.createLog('user.deleted', data);
  }
}

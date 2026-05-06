import { Controller, Get } from '@nestjs/common';
import { EmailServiceService } from './email-service.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class EmailServiceController {
  constructor(private readonly mailService: EmailServiceService) {}

  @EventPattern('user.created')
  async handleUserCreated(@Payload() data: any){
    console.log('[Log] email sent!');
    await this.mailService.sendWelcomeMail((data.email));
  }
  
  @EventPattern('user.updated')
  handleUserUpdated() {} // optional

  @EventPattern('user.deleted')
  handleUserDeleted() {} // optional
}

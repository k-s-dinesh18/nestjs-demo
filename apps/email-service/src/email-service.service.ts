import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailServiceService {
  private transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    service: 'gmail',
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    }
  })

  async sendWelcomeMail(recipient: string){
    await this.transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: recipient,
      subject: 'Welcome',
      text: 'Welcome to our platform 🚀'
    });
  }

}

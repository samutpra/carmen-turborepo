import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import SendMailDto from './send-Mail.dto';

@Injectable()
export class SendMailService {
  async sendMail(email: SendMailDto) {
    const resendToken = process.env.RESEND_TOKEN;
    const resend = new Resend(resendToken);

    await resend.emails.send({
      from: email.from,
      to: email.to,
      subject: email.subject,
      html: email.html,
    });
  }

  async sendMailRegister(email: string, token: string) {}
}

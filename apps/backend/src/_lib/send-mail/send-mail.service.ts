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

  // async sendMailRegister(email: string, token: string) {
  //   const mailObj: SendMailDto = {
  //     from: process.env.EMAIL_FROM,
  //     to: email,
  //     subject: 'Confirm your email',
  //     html: `
  //     <h1>Confirm your email</h1>
  //     <p>Please click the link below to confirm your email address:</p>
  //     <a href="http://localhost:3000/register/${token}">Confirm email</a>
  //     <p>this link will expire in 1 hour</p>
  //     `,
  //   };
  // }

  // async sendMailForgotPassword(email: string, token: string) {
  //   const mailObj: SendMailDto = {
  //     from: process.env.EMAIL_FROM,
  //     to: email,
  //     subject: 'Reset your password',
  //     html: `
  //     <h1>Reset your password</h1>
  //     <p>Please click the link below to reset your password:</p>
  //     <a href="http://localhost:3000/reset-password/${token}">Reset password</a>
  //     <p>this link will expire in 1 hour</p>
  //     `,
  //   };
  // }
}

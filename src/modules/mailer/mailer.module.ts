import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TYPES } from './interfaces/types';
import { SendEmailApplicationImpl } from './application/send-email.application';
import { NodemailerService } from './infrastructure/implementations/nodemailer.service';

const sendEmailApp = {
  provide: TYPES.applications.SendEmailApplication,
  useClass: SendEmailApplicationImpl,
};

const emailService = {
  provide: TYPES.services.EmailService,
  useClass: NodemailerService,
};

@Module({
  imports: [ConfigModule],
  providers: [sendEmailApp, emailService],
  exports: [emailService],
})
export class MailerModule {}

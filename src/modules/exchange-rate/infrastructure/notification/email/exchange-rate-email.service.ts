import { Injectable, Inject } from '@nestjs/common';
import { ExchangeRateNotificationService } from '../../../interfaces/notification/exchange-rate-notification.service.interface';
import { EmailService } from 'src/modules/mailer/interfaces/services/email.service.interface';
import { TYPES as MAILER_TYPES } from 'src/modules/mailer/interfaces/types';
import { ExchangeRate } from '../../../domain/entities/exchange-rate.entity';
import { Email } from 'src/modules/mailer/domain/entities/email.entity';
import { SubscriptionService } from 'src/modules/subscription/domain/services/subscription.service';
import { TYPES as SUBSCRIPTION_TYPES } from 'src/modules/subscription/interfaces/types';

@Injectable()
export class ExchangeRateEmailService
  implements ExchangeRateNotificationService
{
  constructor(
    @Inject(SUBSCRIPTION_TYPES.services.SubscriptionService)
    private readonly subscriptionService: SubscriptionService,
    @Inject(MAILER_TYPES.services.EmailService)
    private readonly emailService: EmailService,
  ) {}

  async sendExchangeRateNotification(
    exchangeRate: ExchangeRate,
  ): Promise<void> {
    const subject = 'Daily Exchange Rate';
    const text = `The exchange rate from USD to UAH is ${exchangeRate.rate} as of ${exchangeRate.date}.`;
    const html = `<p>The exchange rate from USD to UAH is <strong>${exchangeRate.rate}</strong> as of <strong>${exchangeRate.date}</strong>.</p>`;

    const recipients = await this.subscriptionService.getSubscribers();

    const email = new Email(recipients, subject, text, html);

    await this.emailService.sendEmail(email);
  }
}

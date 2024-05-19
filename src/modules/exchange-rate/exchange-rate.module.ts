import { Module } from '@nestjs/common';
import { ExchangeRateController } from './controller/exchange-rate.controller';
import { ConfigModule } from '@nestjs/config';
import { TYPES } from './interfaces/types';
import { FetchExchangeRateApplicationImpl } from './application/fetch-exchange-rate.application';
import { ExchangeRateService } from './domain/services/exchange-rate.service';
import { ExchangeRateClientImpl } from './infrastructure/http/clients/exchange-rate.client';
import { HttpModule } from '@nestjs/axios';

const fetchExchangeRateApp = {
  provide: TYPES.applications.FetchExchangeRateApplication,
  useClass: FetchExchangeRateApplicationImpl,
};

const exchangeRateService = {
  provide: TYPES.services.ExchangeRateService,
  useClass: ExchangeRateService,
};

const exchangeRateClient = {
  provide: TYPES.clients.ExchangeRateClient,
  useClass: ExchangeRateClientImpl,
};

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [ExchangeRateController],
  providers: [fetchExchangeRateApp, exchangeRateClient, exchangeRateService],
  // exports: [],
})
export class ExchangeRateModule {}

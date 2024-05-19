import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { Module } from '@nestjs/common';
import { ExchangeRateModule } from './modules/exchange-rate/exchange-rate.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ExchangeRateModule,
  ],
  providers: [],
})
export class AppModule {}

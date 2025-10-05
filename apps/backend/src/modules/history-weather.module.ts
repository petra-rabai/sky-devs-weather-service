import { Module, Scope } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { AxiosInstanceProvider } from '../providers/axios-instance.provider';
import { HistoryWeatherService } from '../services/history-weather.service';
import { HistoryWeatherController } from '../controllers/history-weather.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '../../.env'),
    }),
  ],
  controllers: [HistoryWeatherController],
  providers: [
    ConfigService,

    {
      provide: HistoryWeatherService,
      useClass: HistoryWeatherService,
      scope: Scope.REQUEST,
    },
    AxiosInstanceProvider,
  ],
})
export class HistoryWeatherModule {}

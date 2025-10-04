import { Module, Scope } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { join } from 'path';
import { ForecastWeatherController } from 'src/controllers/forecast-weather.controller';
import { AxiosInstanceProvider } from 'src/providers/axios-instance.provider';
import { ForecastWeatherService } from 'src/services/forecast-weather.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '../../.env'),
    }),
  ],
  controllers: [ForecastWeatherController],
  providers: [
    ConfigService,

    {
      provide: ForecastWeatherService,
      useClass: ForecastWeatherService,
      scope: Scope.REQUEST,
    },
    AxiosInstanceProvider,
  ],
})
export class ForecastWeatherModule {}

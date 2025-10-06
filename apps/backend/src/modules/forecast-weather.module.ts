import { Module, Scope } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { join } from 'path';
import { ForecastWeatherController } from '../controllers/forecast-weather.controller';
import { AxiosInstanceProvider } from '../providers/axios-instance.provider';
import { ForecastWeatherService } from '../services/forecast-weather.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '../../.env'),
    }),
    CacheModule.register({
      ttl: 300, // 5min
      max: 100, // maximum number of items in cache
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

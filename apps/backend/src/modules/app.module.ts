import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CurrentWeatherModule } from './current-weather.module';
import { ForecastWeatherModule } from './forecast-weather.module';
import { HistoryWeatherModule } from './history-weather.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 300,
      max: 100,
    }),
    CurrentWeatherModule,
    ForecastWeatherModule,
    HistoryWeatherModule,
  ],
})
export class AppModule {}

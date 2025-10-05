import { Module } from '@nestjs/common';
import { CurrentWeatherModule } from './current-weather.module';
import { ForecastWeatherModule } from './forecast-weather.module';
import { HistoryWeatherModule } from './history-weather.module';

@Module({
  imports: [CurrentWeatherModule, ForecastWeatherModule, HistoryWeatherModule],
})
export class AppModule {}

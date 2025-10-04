import { Module } from '@nestjs/common';
import { CurrentWeatherModule } from './current-weather.module';
import { ForecastWeatherModule } from './forecast-weather.module';

@Module({
  imports: [CurrentWeatherModule, ForecastWeatherModule],
})
export class AppModule {}

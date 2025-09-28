import { Module } from '@nestjs/common';
import { CurrentWeatherModule } from './current-weather.module';

@Module({
  imports: [CurrentWeatherModule],
})
export class AppModule {}

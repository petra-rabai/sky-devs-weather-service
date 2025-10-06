import { Module, Scope } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { join } from 'path';
import { CurrentWeatherController } from '../controllers/current-weather.controller';
import { AxiosInstanceProvider } from '../providers/axios-instance.provider';
import { CurrentWeatherService } from '../services/current-weather.service';
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
  controllers: [CurrentWeatherController],
  providers: [
    ConfigService,

    {
      provide: CurrentWeatherService,
      useClass: CurrentWeatherService,
      scope: Scope.REQUEST,
    },
    AxiosInstanceProvider,
  ],
})
export class CurrentWeatherModule {}

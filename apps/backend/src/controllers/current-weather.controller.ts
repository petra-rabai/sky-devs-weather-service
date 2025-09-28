import { Controller, Get, Query } from '@nestjs/common';

import { CurrentWeatherService } from '../services/current-weather.service';
import { isLanguageCode } from '@weather/common/language';
import { CurrentWeatherResponse } from '@weather/contracts/current-weather.contract';

@Controller()
export class CurrentWeatherController {
  constructor(private readonly currentWeatherService: CurrentWeatherService) {}

  @Get('/current-weather')
  async getCurrentWeather(
    @Query('cityName') cityName?: string,
    @Query('IATACode') IATACode?: string,
    @Query('lat') latitude?: string,
    @Query('lon') longitude?: string,
    @Query('lang') lang?: string,
  ): Promise<CurrentWeatherResponse> {
    lang = lang || 'en';

    isLanguageCode(lang);

    if (!(cityName || IATACode || (latitude && longitude))) {
      throw new Error(
        'At least one of cityName, IATACode, latitude, or longitude must be provided',
      );
    }

    const geoLocation =
      latitude && longitude
        ? { latitude, longitude, separator: ',' }
        : undefined;

    const currentWeatherRequest = {
      params: {
        cityName,
        IATACode,
        geoLocation,
      },
      lang,
    };

    return this.currentWeatherService.getCurrentWeather(currentWeatherRequest);
  }
}

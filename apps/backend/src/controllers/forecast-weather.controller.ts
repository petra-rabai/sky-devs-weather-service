import { Controller, Get, Query } from '@nestjs/common';
import { ForecastWeatherResponse } from '@weather/contracts';
import { ForecastWeatherService } from '../services/forecast-weather.service';
import { isLanguageCode } from '@weather/common';

@Controller()
export class ForecastWeatherController {
  constructor(
    private readonly forecastWeatherService: ForecastWeatherService,
  ) {}

  @Get('/forecast-weather')
  async getForecastWeather(
    @Query('cityName') cityName?: string,
    @Query('IATACode') IATACode?: string,
    @Query('lat') latitude?: string,
    @Query('lon') longitude?: string,
    @Query('lang') lang?: string,
    @Query('days') days?: string,
    @Query('alerts') alerts?: string,
    @Query('aqi') aqi?: string,
  ): Promise<ForecastWeatherResponse> {
    lang = lang || 'en';
    alerts = alerts || 'no';
    aqi = aqi || 'no';

    isLanguageCode(lang);

    if (!(cityName || IATACode || (latitude && longitude))) {
      throw new Error(
        'At least one of cityName, IATACode, latitude, or longitude must be provided',
      );
    }

    if (!days || days < '1' || days > '3') {
      throw new Error('Days must be between 1 and 3');
    }

    const geoLocation =
      latitude && longitude
        ? { latitude, longitude, separator: ',' }
        : undefined;

    const forecastWeatherRequest = {
      params: {
        cityName,
        IATACode,
        geoLocation,
      },
      days,
      alerts,
      aqi,
      lang,
    };

    return this.forecastWeatherService.getForecastWeather(
      forecastWeatherRequest,
    );
  }
}

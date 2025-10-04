import { Inject, Injectable } from '@nestjs/common';
import {
  ForecastWeatherRequest,
  ForecastWeatherResponse,
} from '@weather/contracts';

import { type AxiosInstance } from 'axios';

@Injectable()
export class ForecastWeatherService {
  public constructor(
    @Inject('AXIOS_INSTANCE')
    private readonly axiosInstance: AxiosInstance,
  ) {}

  public async getForecastWeather(
    forecastWeatherRequest: ForecastWeatherRequest,
  ): Promise<ForecastWeatherResponse> {
    const { params, days, alerts, aqi, lang } = forecastWeatherRequest;
    const { cityName, IATACode, geoLocation } = params;
    const requestParams = {
      q: cityName,
      days: days,
      alerts: alerts,
      aqi: aqi,
      lang: lang,
    };
    if (IATACode) {
      requestParams.q = IATACode;
    } else if (geoLocation) {
      requestParams.q = `${geoLocation.latitude}${geoLocation.separator}${geoLocation.longitude}`;
    }
    const response = await this.axiosInstance.get<ForecastWeatherResponse>(
      '/forecast.json',
      {
        params: requestParams,
      },
    );
    if (response.status !== 200) {
      throw new Error(
        `Error fetching forecast weather: ${response.statusText}`,
      );
    }
    if (!response.data) {
      throw new Error('No data received from weather API');
    }

    return response.data;
  }
}

import { Inject, Injectable } from '@nestjs/common';

import { type AxiosInstance } from 'axios';
import {
  CurrentWeatherRequest,
  CurrentWeatherResponse,
} from '@weather/contracts';

@Injectable()
export class CurrentWeatherService {
  public constructor(
    @Inject('AXIOS_INSTANCE')
    private readonly axiosInstance: AxiosInstance,
  ) {}

  public async getCurrentWeather(
    currentWeatherRequest: CurrentWeatherRequest,
  ): Promise<CurrentWeatherResponse> {
    const { params, lang } = currentWeatherRequest;
    const { cityName, IATACode, geoLocation } = params;
    const requestParams = {
      q: cityName,
      lang: lang,
    };
    if (IATACode) {
      requestParams.q = IATACode;
    } else if (geoLocation) {
      requestParams.q = `${geoLocation.latitude}${geoLocation.separator}${geoLocation.longitude}`;
    }
    const response = await this.axiosInstance.get<CurrentWeatherResponse>(
      '/current.json',
      {
        params: requestParams,
      },
    );
    if (response.status !== 200) {
      throw new Error(`Error fetching current weather: ${response.statusText}`);
    }
    if (!response.data) {
      throw new Error('No data received from weather API');
    }

    return response.data;
  }
}

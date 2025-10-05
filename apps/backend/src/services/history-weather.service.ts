import { Inject, Injectable } from '@nestjs/common';
import {
  HistoryWeatherRequest,
  HistoryWeatherResponse,
} from '@weather/contracts';

import { type AxiosInstance } from 'axios';

@Injectable()
export class HistoryWeatherService {
  public constructor(
    @Inject('AXIOS_INSTANCE')
    private readonly axiosInstance: AxiosInstance,
  ) {}

  public async getHistoryWeather(
    historyWeatherRequest: HistoryWeatherRequest,
  ): Promise<HistoryWeatherResponse> {
    const { params, date, lang } = historyWeatherRequest;
    const { cityName, IATACode, geoLocation } = params;
    const requestParams = {
      q: cityName,
      dt: date,
      lang: lang,
    };
    if (IATACode) {
      requestParams.q = IATACode;
    } else if (geoLocation) {
      requestParams.q = `${geoLocation.latitude}${geoLocation.separator}${geoLocation.longitude}`;
    }
    const response = await this.axiosInstance.get<HistoryWeatherResponse>(
      '/history.json',
      {
        params: requestParams,
      },
    );
    if (response.status !== 200) {
      throw new Error(`Error fetching history weather: ${response.statusText}`);
    }
    if (!response.data) {
      throw new Error('No data received from weather API');
    }

    return response.data;
  }
}

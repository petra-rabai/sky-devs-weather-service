import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { type Cache } from 'cache-manager';
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
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
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

    const cacheKey = JSON.stringify(currentWeatherRequest);

    const cached =
      await this.cacheManager.get<CurrentWeatherResponse>(cacheKey);

    if (cached) {
      return cached;
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

    await this.cacheManager.set(cacheKey, response.data, 300);

    return response.data;
  }
}

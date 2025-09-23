import { Provider } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '@nestjs/config';

export const AxiosInstanceProvider: Provider = {
  provide: 'AXIOS_INSTANCE',
  inject: [ConfigService],
  useFactory: (configService: ConfigService): AxiosInstance => {
    const baseURL = configService.get<string>('WEATHER_API_BASE_URL');
    const apiKey = configService.get<string>('WEATHER_API_KEY');
    return axios.create({
      baseURL,
      headers: {
        key: apiKey,
      },
    });
  },
};

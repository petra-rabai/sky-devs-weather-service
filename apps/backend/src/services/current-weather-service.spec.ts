import { AxiosInstance } from 'axios';
import { CurrentWeatherService } from './current-weather.service';

import { isLanguageCode } from '@weather/common/language';
import {
  CurrentWeatherRequest,
  CurrentWeatherResponse,
} from '@weather/contracts/current-weather.contract';

describe('CurrentWeatherService - City name', () => {
  let service: CurrentWeatherService;
  let mockAxios: jest.Mocked<AxiosInstance>;
  let mockRequest: CurrentWeatherRequest;

  beforeEach(() => {
    const mockLanguageCode = 'hu';
    isLanguageCode(mockLanguageCode);
    mockAxios = {
      get: jest.fn(),
    } as unknown as jest.Mocked<AxiosInstance>;
    mockRequest = {
      params: {
        cityName: 'Budapest',
        IATACode: undefined,
        geoLocation: undefined,
      },
      lang: mockLanguageCode,
    };
    service = new CurrentWeatherService(mockAxios);
  });

  it('should return weather data when API responds with 200', async () => {
    const mockResponse: CurrentWeatherResponse = {
      location: {
        name: 'Budapest',
        region: 'Budapest',
        country: 'Hungary',
        lat: 47.5,
        lon: 19.0,
        tz_id: 'Europe/Budapest',
        localtime_epoch: 1234567890,
        localtime: '2025-05-02 12:00',
      },
      current: {
        last_updated_epoch: 1234567890,
        last_updated: '2025-05-02 11:45',
        temp_c: 22,
        temp_f: 71.6,
        is_day: 1,
        condition: {
          text: 'Sunny',
          icon: '//cdn.weatherapi.com/sunny.png',
          code: 1000,
        },
        wind_mph: 5,
        wind_kph: 8,
        wind_degree: 100,
        wind_dir: 'E',
        pressure_mb: 1015,
        pressure_in: 30,
        precip_mm: 0,
        precip_in: 0,
        humidity: 60,
        cloud: 0,
        feelslike_c: 22,
        feelslike_f: 71.6,
        windchill_c: 22,
        windchill_f: 71.6,
        heatindex_c: 22,
        heatindex_f: 71.6,
        dewpoint_c: 10,
        dewpoint_f: 50,
        vis_km: 10,
        vis_miles: 6,
        uv: 5,
        gust_mph: 7,
        gust_kph: 11,
      },
    };

    mockAxios.get.mockResolvedValueOnce({ status: 200, data: mockResponse });

    const result = await service.getCurrentWeather(mockRequest);

    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if response status is not 200', async () => {
    mockAxios.get.mockResolvedValueOnce({
      status: 500,
      statusText: 'Server Error',
    });

    await expect(service.getCurrentWeather(mockRequest)).rejects.toThrow(
      'Error fetching current weather: Server Error',
    );
  });

  it('should throw an error if response has no data', async () => {
    mockAxios.get.mockResolvedValueOnce({ status: 200, data: null });

    await expect(service.getCurrentWeather(mockRequest)).rejects.toThrow(
      'No data received from weather API',
    );
  });
});

describe('CurrentWeatherService - IATA code ', () => {
  let service: CurrentWeatherService;
  let mockAxios: jest.Mocked<AxiosInstance>;
  let mockRequest: CurrentWeatherRequest;

  beforeEach(() => {
    const mockLanguageCode = 'hu';
    isLanguageCode(mockLanguageCode);
    mockAxios = {
      get: jest.fn(),
    } as unknown as jest.Mocked<AxiosInstance>;

    mockRequest = {
      params: {
        cityName: '',
        IATACode: 'BUD',
        geoLocation: undefined,
      },
      lang: mockLanguageCode,
    };

    service = new CurrentWeatherService(mockAxios);
  });

  it('should return weather data when API responds with 200', async () => {
    const mockResponse: CurrentWeatherResponse = {
      location: {
        name: 'Budapest',
        region: 'Budapest',
        country: 'Hungary',
        lat: 47.5,
        lon: 19.0,
        tz_id: 'Europe/Budapest',
        localtime_epoch: 1234567890,
        localtime: '2025-05-02 12:00',
      },
      current: {
        last_updated_epoch: 1234567890,
        last_updated: '2025-05-02 11:45',
        temp_c: 22,
        temp_f: 71.6,
        is_day: 1,
        condition: {
          text: 'Sunny',
          icon: '//cdn.weatherapi.com/sunny.png',
          code: 1000,
        },
        wind_mph: 5,
        wind_kph: 8,
        wind_degree: 100,
        wind_dir: 'E',
        pressure_mb: 1015,
        pressure_in: 30,
        precip_mm: 0,
        precip_in: 0,
        humidity: 60,
        cloud: 0,
        feelslike_c: 22,
        feelslike_f: 71.6,
        windchill_c: 22,
        windchill_f: 71.6,
        heatindex_c: 22,
        heatindex_f: 71.6,
        dewpoint_c: 10,
        dewpoint_f: 50,
        vis_km: 10,
        vis_miles: 6,
        uv: 5,
        gust_mph: 7,
        gust_kph: 11,
      },
    };

    mockAxios.get.mockResolvedValueOnce({ status: 200, data: mockResponse });

    const result = await service.getCurrentWeather(mockRequest);

    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if response status is not 200', async () => {
    mockAxios.get.mockResolvedValueOnce({
      status: 500,
      statusText: 'Server Error',
    });

    await expect(service.getCurrentWeather(mockRequest)).rejects.toThrow(
      'Error fetching current weather: Server Error',
    );
  });

  it('should throw an error if response has no data', async () => {
    mockAxios.get.mockResolvedValueOnce({ status: 200, data: null });

    await expect(service.getCurrentWeather(mockRequest)).rejects.toThrow(
      'No data received from weather API',
    );
  });
});

describe('CurrentWeatherService - Geolocation ', () => {
  let service: CurrentWeatherService;
  let mockAxios: jest.Mocked<AxiosInstance>;
  let mockRequest: CurrentWeatherRequest;

  beforeEach(() => {
    const mockLanguageCode = 'hu';
    isLanguageCode(mockLanguageCode);
    mockAxios = {
      get: jest.fn(),
    } as unknown as jest.Mocked<AxiosInstance>;

    mockRequest = {
      params: {
        cityName: '',
        IATACode: undefined,
        geoLocation: {
          latitude: '47.5',
          separator: ',',
          longitude: '19.0',
        },
      },
      lang: mockLanguageCode,
    };

    service = new CurrentWeatherService(mockAxios);
  });

  it('should return weather data when API responds with 200', async () => {
    const mockResponse: CurrentWeatherResponse = {
      location: {
        name: 'Budapest',
        region: 'Budapest',
        country: 'Hungary',
        lat: 47.5,
        lon: 19.0,
        tz_id: 'Europe/Budapest',
        localtime_epoch: 1234567890,
        localtime: '2025-05-02 12:00',
      },
      current: {
        last_updated_epoch: 1234567890,
        last_updated: '2025-05-02 11:45',
        temp_c: 22,
        temp_f: 71.6,
        is_day: 1,
        condition: {
          text: 'Sunny',
          icon: '//cdn.weatherapi.com/sunny.png',
          code: 1000,
        },
        wind_mph: 5,
        wind_kph: 8,
        wind_degree: 100,
        wind_dir: 'E',
        pressure_mb: 1015,
        pressure_in: 30,
        precip_mm: 0,
        precip_in: 0,
        humidity: 60,
        cloud: 0,
        feelslike_c: 22,
        feelslike_f: 71.6,
        windchill_c: 22,
        windchill_f: 71.6,
        heatindex_c: 22,
        heatindex_f: 71.6,
        dewpoint_c: 10,
        dewpoint_f: 50,
        vis_km: 10,
        vis_miles: 6,
        uv: 5,
        gust_mph: 7,
        gust_kph: 11,
      },
    };

    mockAxios.get.mockResolvedValueOnce({ status: 200, data: mockResponse });

    const result = await service.getCurrentWeather(mockRequest);

    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if response status is not 200', async () => {
    mockAxios.get.mockResolvedValueOnce({
      status: 500,
      statusText: 'Server Error',
    });

    await expect(service.getCurrentWeather(mockRequest)).rejects.toThrow(
      'Error fetching current weather: Server Error',
    );
  });

  it('should throw an error if response has no data', async () => {
    mockAxios.get.mockResolvedValueOnce({ status: 200, data: null });

    await expect(service.getCurrentWeather(mockRequest)).rejects.toThrow(
      'No data received from weather API',
    );
  });
});

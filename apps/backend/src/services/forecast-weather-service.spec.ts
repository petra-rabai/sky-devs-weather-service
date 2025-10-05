import { AxiosInstance } from 'axios';
import { ForecastWeatherService } from './forecast-weather.service';
import { ForecastWeatherRequest } from '@weather/contracts';
import { isLanguageCode } from '@weather/common/language';
import {
  mockForecastWeatherWithAQIAndAlertsResponse,
  mockForecastWeatherWithoutAQIAndAlertsResponse,
} from './__mocks__/forecast-weather.mock';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

describe('ForecastWeatherService - 1 day, without aqi and alerts', () => {
  let service: ForecastWeatherService;
  let mockAxios: jest.Mocked<AxiosInstance>;
  let mockForecastWeatherRequest: ForecastWeatherRequest;
  let mockCache: jest.Mocked<Cache>;

  beforeEach(() => {
    const mockLanguageCode = 'hu';
    isLanguageCode(mockLanguageCode);
    mockAxios = {
      get: jest.fn(),
    } as unknown as jest.Mocked<AxiosInstance>;

    mockCache = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
      mget: jest.fn(),
      mset: jest.fn(),
      mdel: jest.fn(),
      reset: jest.fn(),
      store: {},
      keys: jest.fn(),
      ttl: jest.fn(),
      wrap: jest.fn(),
    } as unknown as jest.Mocked<Cache>;

    mockForecastWeatherRequest = {
      params: {
        cityName: 'Budapest',
        IATACode: undefined,
        geoLocation: undefined,
      },
      days: '1',
      lang: mockLanguageCode,
    };
    service = new ForecastWeatherService(mockAxios, mockCache);
  });

  it('should return weather data when API responds with 200', async () => {
    mockAxios.get.mockResolvedValueOnce({
      status: 200,
      data: mockForecastWeatherWithoutAQIAndAlertsResponse,
    });

    const result = await service.getForecastWeather(mockForecastWeatherRequest);

    expect(result).toEqual(mockForecastWeatherWithoutAQIAndAlertsResponse);
  });

  it('should throw an error if response status is not 200', async () => {
    mockAxios.get.mockResolvedValueOnce({
      status: 500,
      statusText: 'Server Error',
    });

    await expect(
      service.getForecastWeather(mockForecastWeatherRequest),
    ).rejects.toThrow('Error fetching forecast weather: Server Error');
  });

  it('should throw an error if response has no data', async () => {
    mockAxios.get.mockResolvedValueOnce({ status: 200, data: null });

    await expect(
      service.getForecastWeather(mockForecastWeatherRequest),
    ).rejects.toThrow('No data received from weather API');
  });
});

describe('ForecastWeatherService - 1 day, with aqi and alerts', () => {
  let service: ForecastWeatherService;
  let mockAxios: jest.Mocked<AxiosInstance>;
  let mockForecastWeatherRequest: ForecastWeatherRequest;

  beforeEach(() => {
    const mockLanguageCode = 'hu';
    isLanguageCode(mockLanguageCode);
    mockAxios = {
      get: jest.fn(),
    } as unknown as jest.Mocked<AxiosInstance>;
    mockForecastWeatherRequest = {
      params: {
        cityName: 'Budapest',
        IATACode: undefined,
        geoLocation: undefined,
      },
      days: '1',
      aqi: 'yes',
      alerts: 'yes',
      lang: mockLanguageCode,
    };
    service = new ForecastWeatherService(mockAxios);
  });

  it('should return weather data when API responds with 200', async () => {
    mockAxios.get.mockResolvedValueOnce({
      status: 200,
      data: mockForecastWeatherWithAQIAndAlertsResponse,
    });

    const result = await service.getForecastWeather(mockForecastWeatherRequest);

    expect(result).toEqual(mockForecastWeatherWithAQIAndAlertsResponse);
  });

  it('should throw an error if response status is not 200', async () => {
    mockAxios.get.mockResolvedValueOnce({
      status: 500,
      statusText: 'Server Error',
    });

    await expect(
      service.getForecastWeather(mockForecastWeatherRequest),
    ).rejects.toThrow('Error fetching forecast weather: Server Error');
  });

  it('should throw an error if response has no data', async () => {
    mockAxios.get.mockResolvedValueOnce({ status: 200, data: null });

    await expect(
      service.getForecastWeather(mockForecastWeatherRequest),
    ).rejects.toThrow('No data received from weather API');
  });
});

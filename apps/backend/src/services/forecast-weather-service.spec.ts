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
import { Test, TestingModule } from '@nestjs/testing';

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
      aqi: 'yes',
      alerts: 'yes',
      lang: mockLanguageCode,
    };
    service = new ForecastWeatherService(mockAxios, mockCache);
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

describe('ForecastWeatherService Caching', () => {
  let service: ForecastWeatherService;
  let mockAxios: jest.Mocked<AxiosInstance>;
  let mockCache: jest.Mocked<Cache>;
  let mockForecastWeatherRequest: ForecastWeatherRequest;

  beforeEach(async () => {
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
      lang: 'en',
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ForecastWeatherService,
        { provide: 'AXIOS_INSTANCE', useValue: mockAxios },
        { provide: CACHE_MANAGER, useValue: mockCache },
      ],
    }).compile();

    service = module.get<ForecastWeatherService>(ForecastWeatherService);
  });

  it('should fetch from API and set cache on first call', async () => {
    const mockResponse = {
      data: { forecast: 'mockForecastData' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    mockCache.get.mockResolvedValueOnce(null);
    mockAxios.get.mockResolvedValueOnce(mockResponse);
    mockCache.set.mockResolvedValueOnce(undefined);

    await service.getForecastWeather(mockForecastWeatherRequest);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockCache.set).toHaveBeenCalledTimes(1);
  });

  it('should return cached value on second call', async () => {
    mockCache.get.mockResolvedValueOnce({ foo: 'cached' });
    const result = await service.getForecastWeather(mockForecastWeatherRequest);
    expect(result).toEqual({ foo: 'cached' });
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockAxios.get).not.toHaveBeenCalled();
  });
});

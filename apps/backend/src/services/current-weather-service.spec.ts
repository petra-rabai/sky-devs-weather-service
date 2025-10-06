import { AxiosInstance } from 'axios';
import { CurrentWeatherService } from './current-weather.service';

import { isLanguageCode } from '@weather/common/language';
import { CurrentWeatherRequest } from '@weather/contracts';
import { mockCurrentWeatherResponse } from './__mocks__/current-weather.mock';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Test, TestingModule } from '@nestjs/testing';

describe('CurrentWeatherService - City name', () => {
  let service: CurrentWeatherService;
  let mockAxios: jest.Mocked<AxiosInstance>;
  let mockCurrentWeatherRequest: CurrentWeatherRequest;
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

    mockCurrentWeatherRequest = {
      params: {
        cityName: 'Budapest',
        IATACode: undefined,
        geoLocation: undefined,
      },
      lang: mockLanguageCode,
    };
    service = new CurrentWeatherService(mockAxios, mockCache);
  });

  it('should return weather data when API responds with 200', async () => {
    mockAxios.get.mockResolvedValueOnce({
      status: 200,
      data: mockCurrentWeatherResponse,
    });

    const result = await service.getCurrentWeather(mockCurrentWeatherRequest);

    expect(result).toEqual(mockCurrentWeatherResponse);
  });

  it('should throw an error if response status is not 200', async () => {
    mockAxios.get.mockResolvedValueOnce({
      status: 500,
      statusText: 'Server Error',
    });

    await expect(
      service.getCurrentWeather(mockCurrentWeatherRequest),
    ).rejects.toThrow('Error fetching current weather: Server Error');
  });

  it('should throw an error if response has no data', async () => {
    mockAxios.get.mockResolvedValueOnce({ status: 200, data: null });

    await expect(
      service.getCurrentWeather(mockCurrentWeatherRequest),
    ).rejects.toThrow('No data received from weather API');
  });
});

describe('CurrentWeatherService - IATA code ', () => {
  let service: CurrentWeatherService;
  let mockAxios: jest.Mocked<AxiosInstance>;
  let mockCurrentWeatherRequest: CurrentWeatherRequest;
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

    mockCurrentWeatherRequest = {
      params: {
        cityName: '',
        IATACode: 'BUD',
        geoLocation: undefined,
      },
      lang: mockLanguageCode,
    };

    service = new CurrentWeatherService(mockAxios, mockCache);
  });

  it('should return weather data when API responds with 200', async () => {
    mockAxios.get.mockResolvedValueOnce({
      status: 200,
      data: mockCurrentWeatherResponse,
    });

    const result = await service.getCurrentWeather(mockCurrentWeatherRequest);

    expect(result).toEqual(mockCurrentWeatherResponse);
  });

  it('should throw an error if response status is not 200', async () => {
    mockAxios.get.mockResolvedValueOnce({
      status: 500,
      statusText: 'Server Error',
    });

    await expect(
      service.getCurrentWeather(mockCurrentWeatherRequest),
    ).rejects.toThrow('Error fetching current weather: Server Error');
  });

  it('should throw an error if response has no data', async () => {
    mockAxios.get.mockResolvedValueOnce({ status: 200, data: null });

    await expect(
      service.getCurrentWeather(mockCurrentWeatherRequest),
    ).rejects.toThrow('No data received from weather API');
  });
});

describe('CurrentWeatherService - Geolocation ', () => {
  let service: CurrentWeatherService;
  let mockAxios: jest.Mocked<AxiosInstance>;
  let mockCurrentWeatherRequest: CurrentWeatherRequest;
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

    mockCurrentWeatherRequest = {
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

    service = new CurrentWeatherService(mockAxios, mockCache);
  });

  it('should return weather data when API responds with 200', async () => {
    mockAxios.get.mockResolvedValueOnce({
      status: 200,
      data: mockCurrentWeatherResponse,
    });

    const result = await service.getCurrentWeather(mockCurrentWeatherRequest);

    expect(result).toEqual(mockCurrentWeatherResponse);
  });

  it('should throw an error if response status is not 200', async () => {
    mockAxios.get.mockResolvedValueOnce({
      status: 500,
      statusText: 'Server Error',
    });

    await expect(
      service.getCurrentWeather(mockCurrentWeatherRequest),
    ).rejects.toThrow('Error fetching current weather: Server Error');
  });

  it('should throw an error if response has no data', async () => {
    mockAxios.get.mockResolvedValueOnce({ status: 200, data: null });

    await expect(
      service.getCurrentWeather(mockCurrentWeatherRequest),
    ).rejects.toThrow('No data received from weather API');
  });
});

describe('CurrentWeatherService Caching', () => {
  let service: CurrentWeatherService;
  let mockAxios: jest.Mocked<AxiosInstance>;
  let mockCache: jest.Mocked<Cache>;
  let mockCurrentWeatherRequest: CurrentWeatherRequest;

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

    mockCurrentWeatherRequest = {
      params: {
        cityName: 'Budapest',
        IATACode: undefined,
        geoLocation: undefined,
      },
      lang: 'en',
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrentWeatherService,
        { provide: 'AXIOS_INSTANCE', useValue: mockAxios },
        { provide: CACHE_MANAGER, useValue: mockCache },
      ],
    }).compile();

    service = module.get<CurrentWeatherService>(CurrentWeatherService);
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

    await service.getCurrentWeather(mockCurrentWeatherRequest);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockCache.set).toHaveBeenCalledTimes(1);
  });

  it('should return cached value on second call', async () => {
    mockCache.get.mockResolvedValueOnce({ foo: 'cached' });
    const result = await service.getCurrentWeather(mockCurrentWeatherRequest);
    expect(result).toEqual({ foo: 'cached' });
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockAxios.get).not.toHaveBeenCalled();
  });
});

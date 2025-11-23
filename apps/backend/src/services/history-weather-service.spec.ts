import { AxiosInstance } from 'axios';
import { HistoryWeatherRequest } from '@weather/contracts';
import { isLanguageCode } from '@weather/common/language';
import { HistoryWeatherService } from './history-weather.service';
import { mockHistoryWeatherResponse } from './__mocks__/history-weather.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { addDays, format } from 'date-fns';

describe('HistoryWeatherService - within date range', () => {
  let service: HistoryWeatherService;
  let mockAxios: jest.Mocked<AxiosInstance>;
  let mockHistoryWeatherRequest: HistoryWeatherRequest;
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

    const futureDate = format(addDays(new Date(), -7), 'yyyy-MM-dd');

    mockHistoryWeatherRequest = {
      params: {
        cityName: 'Budapest',
        IATACode: undefined,
        geoLocation: undefined,
      },
      date: futureDate,
      lang: mockLanguageCode,
    };

    service = new HistoryWeatherService(mockAxios, mockCache);
  });

  it('should return weather data when API responds with 200', async () => {
    mockAxios.get.mockResolvedValueOnce({
      status: 200,
      data: mockHistoryWeatherResponse,
    });

    const result = await service.getHistoryWeather(mockHistoryWeatherRequest);

    expect(result).toEqual(mockHistoryWeatherResponse);
  });

  it('should throw an error if response status is not 200', async () => {
    mockAxios.get.mockResolvedValueOnce({
      status: 500,
      statusText: 'Server Error',
    });

    await expect(
      service.getHistoryWeather(mockHistoryWeatherRequest),
    ).rejects.toThrow('Error fetching history weather: Server Error');
  });

  it('should throw an error if response has no data', async () => {
    mockAxios.get.mockResolvedValueOnce({ status: 200, data: null });

    await expect(
      service.getHistoryWeather(mockHistoryWeatherRequest),
    ).rejects.toThrow('No data received from weather API');
  });
});

describe('HistoryWeatherService Caching', () => {
  let service: HistoryWeatherService;
  let mockAxios: jest.Mocked<AxiosInstance>;
  let mockCache: jest.Mocked<Cache>;
  let mockHistoryWeatherRequest: HistoryWeatherRequest;

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

    mockHistoryWeatherRequest = {
      params: {
        cityName: 'Budapest',
        IATACode: undefined,
        geoLocation: undefined,
      },
      date: '2025-09-30',
      lang: 'en',
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoryWeatherService,
        { provide: 'AXIOS_INSTANCE', useValue: mockAxios },
        { provide: CACHE_MANAGER, useValue: mockCache },
      ],
    }).compile();

    service = module.get<HistoryWeatherService>(HistoryWeatherService);
  });

  it('should fetch from API and set cache on first call', async () => {
    const mockResponse = {
      data: { history: 'mockHistoryData' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    mockCache.get.mockResolvedValueOnce(null);
    mockAxios.get.mockResolvedValueOnce(mockResponse);
    mockCache.set.mockResolvedValueOnce(undefined);

    await service.getHistoryWeather(mockHistoryWeatherRequest);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockCache.set).toHaveBeenCalledTimes(1);
  });

  it('should return cached value on second call', async () => {
    mockCache.get.mockResolvedValueOnce({ foo: 'cached' });
    const result = await service.getHistoryWeather(mockHistoryWeatherRequest);
    expect(result).toEqual({ foo: 'cached' });
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockAxios.get).not.toHaveBeenCalled();
  });
});

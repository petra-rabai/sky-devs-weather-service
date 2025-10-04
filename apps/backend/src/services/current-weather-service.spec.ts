import { AxiosInstance } from 'axios';
import { CurrentWeatherService } from './current-weather.service';

import { isLanguageCode } from '@weather/common/language';
import { CurrentWeatherRequest } from '@weather/contracts';
import { mockCurrentWeatherResponse } from './__mocks__/current-weather.mock';

describe('CurrentWeatherService - City name', () => {
  let service: CurrentWeatherService;
  let mockAxios: jest.Mocked<AxiosInstance>;
  let mockCurrentWeatherRequest: CurrentWeatherRequest;

  beforeEach(() => {
    const mockLanguageCode = 'hu';
    isLanguageCode(mockLanguageCode);
    mockAxios = {
      get: jest.fn(),
    } as unknown as jest.Mocked<AxiosInstance>;
    mockCurrentWeatherRequest = {
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

  beforeEach(() => {
    const mockLanguageCode = 'hu';
    isLanguageCode(mockLanguageCode);
    mockAxios = {
      get: jest.fn(),
    } as unknown as jest.Mocked<AxiosInstance>;

    mockCurrentWeatherRequest = {
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

  beforeEach(() => {
    const mockLanguageCode = 'hu';
    isLanguageCode(mockLanguageCode);
    mockAxios = {
      get: jest.fn(),
    } as unknown as jest.Mocked<AxiosInstance>;

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

    service = new CurrentWeatherService(mockAxios);
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

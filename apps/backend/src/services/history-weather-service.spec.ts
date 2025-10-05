import { AxiosInstance } from 'axios';
import { HistoryWeatherRequest } from '@weather/contracts';
import { isLanguageCode } from '@weather/common/language';
import { HistoryWeatherService } from './history-weather.service';
import { mockHistoryWeatherResponse } from './__mocks__/history-weather.mock';

describe('HistoryWeatherService - within date range', () => {
  let service: HistoryWeatherService;
  let mockAxios: jest.Mocked<AxiosInstance>;
  let mockHistoryWeatherRequest: HistoryWeatherRequest;

  beforeEach(() => {
    const mockLanguageCode = 'hu';
    isLanguageCode(mockLanguageCode);
    mockAxios = {
      get: jest.fn(),
    } as unknown as jest.Mocked<AxiosInstance>;
    mockHistoryWeatherRequest = {
      params: {
        cityName: 'Budapest',
        IATACode: undefined,
        geoLocation: undefined,
      },
      date: '2025-09-30',
      lang: mockLanguageCode,
    };
    service = new HistoryWeatherService(mockAxios);
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

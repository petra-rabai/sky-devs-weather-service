import { Test, TestingModule } from '@nestjs/testing';
import { isLanguageCode } from '@weather/common/language';
import { ForecastWeatherController } from './forecast-weather.controller';
import { ForecastWeatherService } from 'src/services/forecast-weather.service';
import { mockForecastWeatherWithoutAQIAndAlertsResponse } from 'src/services/__mocks__/forecast-weather.mock';

describe('ForecastWeatherController', () => {
  let controller: ForecastWeatherController;
  let service: ForecastWeatherService;

  beforeEach(async () => {
    const mockForecastWeatherService = {
      getCurrentWeather: jest
        .fn()
        .mockResolvedValue(mockForecastWeatherWithoutAQIAndAlertsResponse),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForecastWeatherController],
      providers: [
        {
          provide: ForecastWeatherService,
          useValue: mockForecastWeatherService,
        },
      ],
    }).compile();

    controller = await module.resolve<ForecastWeatherController>(
      ForecastWeatherController,
    );
    service = await module.resolve<ForecastWeatherService>(
      ForecastWeatherService,
    );

    jest.spyOn(service, 'getForecastWeather');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return current weather data', async () => {
    const result = await controller.getForecastWeather(
      'Budapest',
      undefined,
      undefined,
      undefined,
      'en',
      '1',
    );

    expect(service['getForecastWeather']).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockForecastWeatherWithoutAQIAndAlertsResponse);
  });

  it('should throw an error if no parameters are provided', async () => {
    await expect(controller.getForecastWeather()).rejects.toThrow(
      'At least one of cityName, IATACode, latitude, or longitude must be provided',
    );
  });

  it('should throw an error if invalid language code is provided', async () => {
    await expect(
      controller.getForecastWeather(
        'Budapest',
        undefined,
        undefined,
        undefined,
        'invalid',
        '1',
      ),
    ).rejects.toThrow('Invalid language code: invalid');
  });

  it('should construct geoLocation if latitude and longitude are provided', async () => {
    const latitude = '51.5074';
    const longitude = '-0.1278';
    const lang = 'en' as const;
    isLanguageCode(lang);

    const mockResponse = { weather: 'cloudy' };
    (service.getForecastWeather as jest.Mock).mockResolvedValue(mockResponse);

    const result = await controller.getForecastWeather(
      undefined,
      undefined,
      latitude,
      longitude,
      lang,
      '1',
    );

    expect(result).toEqual(mockResponse);
  });
});

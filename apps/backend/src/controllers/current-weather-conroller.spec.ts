import { Test, TestingModule } from '@nestjs/testing';
import { CurrentWeatherController } from './current-weather.controller';
import { CurrentWeatherService } from '../services/current-weather.service';
import { isLanguageCode } from '@weather/common/language';
import { mockCurrentWeatherResponse } from '../services/__mocks__/current-weather.mock';

describe('CurrentWeatherController', () => {
  let controller: CurrentWeatherController;
  let service: CurrentWeatherService;

  beforeEach(async () => {
    const mockCurrentWeatherService = {
      getCurrentWeather: jest
        .fn()
        .mockResolvedValue(mockCurrentWeatherResponse),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrentWeatherController],
      providers: [
        {
          provide: CurrentWeatherService,
          useValue: mockCurrentWeatherService,
        },
      ],
    }).compile();

    controller = await module.resolve<CurrentWeatherController>(
      CurrentWeatherController,
    );
    service = await module.resolve<CurrentWeatherService>(
      CurrentWeatherService,
    );

    jest.spyOn(service, 'getCurrentWeather');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return current weather data', async () => {
    const result = await controller.getCurrentWeather('Budapest');

    expect(service['getCurrentWeather']).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockCurrentWeatherResponse);
  });

  it('should throw an error if no parameters are provided', async () => {
    await expect(controller.getCurrentWeather()).rejects.toThrow(
      'At least one of cityName, IATACode, latitude, or longitude must be provided',
    );
  });

  it('should throw an error if invalid language code is provided', async () => {
    await expect(
      controller.getCurrentWeather(
        'Budapest',
        undefined,
        undefined,
        undefined,
        'invalid',
      ),
    ).rejects.toThrow('Invalid language code: invalid');
  });

  it('should construct geoLocation if latitude and longitude are provided', async () => {
    const latitude = '51.5074';
    const longitude = '-0.1278';
    const lang = 'en' as const;
    isLanguageCode(lang);

    const mockResponse = { weather: 'cloudy' };
    (service.getCurrentWeather as jest.Mock).mockResolvedValue(mockResponse);

    const result = await controller.getCurrentWeather(
      undefined,
      undefined,
      latitude,
      longitude,
      lang,
    );

    expect(result).toEqual(mockResponse);
  });
});

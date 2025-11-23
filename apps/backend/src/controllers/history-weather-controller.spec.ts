import { Test, TestingModule } from '@nestjs/testing';
import { isLanguageCode } from '@weather/common/language';
import { HistoryWeatherController } from './history-weather.controller';
import { HistoryWeatherService } from '../services/history-weather.service';
import { mockHistoryWeatherResponse } from '../services/__mocks__/history-weather.mock';
import { addDays, format } from 'date-fns';

describe('HistoryWeatherController', () => {
  let controller: HistoryWeatherController;
  let service: HistoryWeatherService;
  const futureDate = format(addDays(new Date(), -7), 'yyyy-MM-dd');
  beforeEach(async () => {
    const mockHistoryWeatherService = {
      getHistoryWeather: jest
        .fn()
        .mockResolvedValue(mockHistoryWeatherResponse),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryWeatherController],
      providers: [
        {
          provide: HistoryWeatherService,
          useValue: mockHistoryWeatherService,
        },
      ],
    }).compile();

    controller = await module.resolve<HistoryWeatherController>(
      HistoryWeatherController,
    );
    service = await module.resolve<HistoryWeatherService>(
      HistoryWeatherService,
    );

    jest.spyOn(service, 'getHistoryWeather');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return history weather data', async () => {
    const result = await controller.getHistoryWeather(
      'Budapest',
      undefined,
      undefined,
      undefined,
      'en',
      futureDate,
    );

    expect(service['getHistoryWeather']).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockHistoryWeatherResponse);
  });

  it('should throw an error if no parameters are provided', async () => {
    await expect(controller.getHistoryWeather()).rejects.toThrow(
      'At least one of cityName, IATACode, latitude, or longitude must be provided',
    );
  });

  it('should throw an error if invalid language code is provided', async () => {
    await expect(
      controller.getHistoryWeather(
        'Budapest',
        undefined,
        undefined,
        undefined,
        'invalid',
        futureDate,
      ),
    ).rejects.toThrow('Invalid language code: invalid');
  });

  it('should throw an error if date is not provided', async () => {
    await expect(
      controller.getHistoryWeather(
        'Budapest',
        undefined,
        undefined,
        undefined,
        'en',
        undefined,
      ),
    ).rejects.toThrow('Date is required');
  });

  it('should construct geoLocation if latitude and longitude are provided', async () => {
    const latitude = '51.5074';
    const longitude = '-0.1278';
    const lang = 'en' as const;
    isLanguageCode(lang);

    const mockResponse = { weather: 'cloudy' };
    (service.getHistoryWeather as jest.Mock).mockResolvedValue(mockResponse);

    const result = await controller.getHistoryWeather(
      undefined,
      undefined,
      latitude,
      longitude,
      lang,
      futureDate,
    );

    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if date not between the 7 days range', async () => {
    const randomPastDate = new Date();
    randomPastDate.setDate(
      randomPastDate.getDate() - (8 + Math.floor(Math.random() * 23)),
    );
    const mockedDate = format(randomPastDate, 'yyyy-MM-dd');
    await expect(
      controller.getHistoryWeather(
        'Budapest',
        undefined,
        undefined,
        undefined,
        'en',
        mockedDate,
      ),
    ).rejects.toThrow('Date must be within the last 7 days, including today.');
  });
});

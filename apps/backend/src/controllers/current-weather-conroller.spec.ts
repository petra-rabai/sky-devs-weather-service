import { Test, TestingModule } from '@nestjs/testing';
import { CurrentWeatherController } from './current-weather.controller';
import { CurrentWeatherService } from '../services/current-weather.service';
import { isLanguageCode } from '@weather/common/language';
import { CurrentWeatherResponse } from '@weather/contracts/current-weather.contract';

describe('CurrentWeatherController', () => {
  let controller: CurrentWeatherController;
  let service: CurrentWeatherService;

  beforeEach(async () => {
    const mockCurrentWeatherService = {
      getCurrentWeather: jest.fn().mockResolvedValue({
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
      } as CurrentWeatherResponse),
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

    const result = await controller.getCurrentWeather('Budapest');

    expect(service['getCurrentWeather']).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockResponse);
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

import { Test, TestingModule } from '@nestjs/testing';
import { AxiosInstance } from 'axios';
import { ForecastWeatherModule } from './forecast-weather.module';
import { ForecastWeatherService } from '../services/forecast-weather.service';

describe('ForecastWeatherModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [ForecastWeatherModule],
    })
      .overrideProvider('AXIOS_INSTANCE')
      .useValue({} as AxiosInstance)
      .compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide ForecastWeatherService', async () => {
    const service = await module.resolve<ForecastWeatherService>(
      ForecastWeatherService,
    );
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(ForecastWeatherService);
  });
});

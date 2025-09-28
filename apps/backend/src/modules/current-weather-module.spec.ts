import { Test, TestingModule } from '@nestjs/testing';
import { CurrentWeatherModule } from './current-weather.module';
import { CurrentWeatherService } from '../services/current-weather.service';
import { AxiosInstance } from 'axios';

describe('CurrentWeatherModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [CurrentWeatherModule],
    })
      .overrideProvider('AXIOS_INSTANCE')
      .useValue({} as AxiosInstance)
      .compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide CurrentWeatherService', async () => {
    const service = await module.resolve<CurrentWeatherService>(
      CurrentWeatherService,
    );
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(CurrentWeatherService);
  });
});

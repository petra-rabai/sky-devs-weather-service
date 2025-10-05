import { Test, TestingModule } from '@nestjs/testing';
import { AxiosInstance } from 'axios';
import { HistoryWeatherModule } from './history-weather.module';
import { HistoryWeatherService } from '../services/history-weather.service';

describe('HistoryWeatherModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [HistoryWeatherModule],
    })
      .overrideProvider('AXIOS_INSTANCE')
      .useValue({} as AxiosInstance)
      .compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide HistoryWeatherService', async () => {
    const service = await module.resolve<HistoryWeatherService>(
      HistoryWeatherService,
    );
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(HistoryWeatherService);
  });
});

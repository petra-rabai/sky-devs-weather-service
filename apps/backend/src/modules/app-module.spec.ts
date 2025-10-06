import { Test, TestingModule } from '@nestjs/testing';
import { Type, DynamicModule } from '@nestjs/common';
import { AppModule } from './app.module';
import { CacheModule } from '@nestjs/cache-manager';
import { CurrentWeatherModule } from './current-weather.module';
import { ForecastWeatherModule } from './forecast-weather.module';
import { HistoryWeatherModule } from './history-weather.module';

describe('AppModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should import required weather modules', () => {
    const moduleMetadata =
      (Reflect.getMetadata('imports', AppModule) as Array<Type<unknown>>) || [];
    const importNames = moduleMetadata.map((mod) => mod.name);

    expect(importNames).toContain(CurrentWeatherModule.name);
    expect(importNames).toContain(ForecastWeatherModule.name);
    expect(importNames).toContain(HistoryWeatherModule.name);
  });

  it('should register CacheModule dynamically', () => {
    const moduleMetadata =
      (Reflect.getMetadata('imports', AppModule) as Array<
        Type<unknown> | DynamicModule
      >) || [];

    const hasCacheModule = moduleMetadata.some(
      (mod) => typeof mod === 'object' && mod.module === CacheModule,
    );

    expect(hasCacheModule).toBe(true);
  });
});

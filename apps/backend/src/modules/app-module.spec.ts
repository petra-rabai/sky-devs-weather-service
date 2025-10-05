import { Test, TestingModule } from '@nestjs/testing';
import { Type } from '@nestjs/common';
import { AppModule } from './app.module';

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

  it('should import required modules', () => {
    const moduleMetadata =
      (Reflect.getMetadata('imports', AppModule) as Array<Type<unknown>>) || [];
    const importNames = moduleMetadata.map((mod) => mod.name);
    expect(importNames).toContain('CurrentWeatherModule');
    expect(importNames).toContain('ForecastWeatherModule');
    expect(importNames).toContain('HistoryWeatherModule');
  });
});

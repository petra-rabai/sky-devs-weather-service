import { Controller, Get, Query } from '@nestjs/common';
import { HistoryWeatherResponse } from '@weather/contracts';
import { HistoryWeatherService } from '../services/history-weather.service';
import { isLanguageCode } from '@weather/common';
import {
  endOfDay,
  format,
  isAfter,
  isBefore,
  parseISO,
  startOfDay,
  subDays,
} from 'date-fns';

@Controller()
export class HistoryWeatherController {
  constructor(private readonly historyWeatherService: HistoryWeatherService) {}

  @Get('/history-weather')
  async getHistoryWeather(
    @Query('cityName') cityName?: string,
    @Query('IATACode') IATACode?: string,
    @Query('lat') latitude?: string,
    @Query('lon') longitude?: string,
    @Query('lang') lang?: string,
    @Query('date') date?: string,
  ): Promise<HistoryWeatherResponse> {
    lang = lang || 'en';

    isLanguageCode(lang);

    if (!(cityName || IATACode || (latitude && longitude))) {
      throw new Error(
        'At least one of cityName, IATACode, latitude, or longitude must be provided',
      );
    }
    if (!date) {
      throw new Error('Date is required');
    }

    const formattedDate = format(new Date(date), 'yyyy-MM-dd');
    const checkDate = parseISO(formattedDate);

    const today = endOfDay(new Date());
    const sevenDaysAgo = startOfDay(subDays(today, 7));

    if (isBefore(checkDate, sevenDaysAgo) || isAfter(checkDate, today)) {
      throw new Error('Date must be within the last 7 days, including today.');
    }

    const geoLocation =
      latitude && longitude
        ? { latitude, longitude, separator: ',' }
        : undefined;

    const historyWeatherRequest = {
      params: {
        cityName,
        IATACode,
        geoLocation,
      },
      date: formattedDate,
      lang,
    };

    return this.historyWeatherService.getHistoryWeather(historyWeatherRequest);
  }
}

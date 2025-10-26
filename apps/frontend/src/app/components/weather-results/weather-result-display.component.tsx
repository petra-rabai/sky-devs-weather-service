import React from "react";
import { CurrentWeatherResultDisplay } from "./current-weather/current-weather-result.component";
import {
  CurrentWeatherResponse,
  ForecastWeatherResponse,
} from "@weather/contracts";
import { ForecastWeatherResultDisplay } from "./forecast-weather/forecast-weather-result.component";

interface Props {
  data: {
    currentWeather?: CurrentWeatherResponse;
    forecastWeather?: ForecastWeatherResponse;
  };
}

export const WeatherDisplay: React.FC<Props> = ({ data }) => (
  <div className="m-2">
    {data && data.currentWeather && (
      <CurrentWeatherResultDisplay data={data.currentWeather} />
    )}
    {data && data.forecastWeather && (
      <ForecastWeatherResultDisplay data={data.forecastWeather} />
    )}
  </div>
);

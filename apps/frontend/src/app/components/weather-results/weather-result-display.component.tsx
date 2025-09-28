import React from "react";
import { CurrentWeatherDisplay } from "./current-weather/current-weather-result.component";
import { CurrentWeatherResponse } from "@weather/contracts/current-weather.contract";

interface Props {
  data: CurrentWeatherResponse;
}

export const WeatherDisplay: React.FC<Props> = ({ data }) => (
  <div className="m-2">
    {data && <CurrentWeatherDisplay data={data} />}
    {/* Add more components for other weather types here */}
  </div>
);

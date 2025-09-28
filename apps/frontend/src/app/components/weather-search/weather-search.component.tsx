import { useState } from "react";
import { WeatherModeSelector } from "../weather-mod/weather-mod.component";
import {
  CurrentWeatherSearch,
  ForecastWeatherSearch,
  HistoricalWeatherSearch,
  DatabaseSearch,
} from "./components";

export const WeatherSearch: React.FC = () => {
  const [switcherStates, setSwitcherStates] = useState<
    Record<string, "on" | "off">
  >({
    "current-weather": "off",
    "forecast-weather": "off",
    "historical-weather": "off",
    database: "off",
  });
  const handleSwitcherChange = (name: string, value: "on" | "off") => {
    setSwitcherStates((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <WeatherModeSelector onSwitcherChange={handleSwitcherChange} />
      <div className="mb-4">
        {switcherStates["current-weather"] === "on" && <CurrentWeatherSearch />}
        {switcherStates["forecast-weather"] === "on" && (
          <ForecastWeatherSearch />
        )}
        {switcherStates["historical-weather"] === "on" && (
          <HistoricalWeatherSearch />
        )}
        {switcherStates["database"] === "on" && <DatabaseSearch />}
      </div>
    </div>
  );
};

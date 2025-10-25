import { ForecastWeatherResponse } from "@weather/contracts";

export async function fetchForecastWeatherFromApi(
  params: string
): Promise<ForecastWeatherResponse> {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`/api/forecast-weather?${query}`);

  if (!response.ok) throw new Error("Failed to fetch forecast weather");
  return response.json();
}

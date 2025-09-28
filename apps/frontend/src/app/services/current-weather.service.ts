import { CurrentWeatherResponse } from "@weather/contracts/current-weather.contract";

export async function fetchCurrentWeatherFromApi(
  params: string
): Promise<CurrentWeatherResponse> {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`/api/current-weather?${query}`);

  if (!response.ok) throw new Error("Failed to fetch weather");
  return response.json();
}

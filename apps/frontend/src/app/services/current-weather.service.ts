import { CurrentWeatherResponse } from "@weather/contracts";

export async function fetchCurrentWeatherFromApi(
  params: string
): Promise<CurrentWeatherResponse> {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`/api/current-weather?${query}`);

  if (!response.ok) throw new Error("Failed to fetch current weather");
  return response.json();
}

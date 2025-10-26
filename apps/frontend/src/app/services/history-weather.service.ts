import { HistoryWeatherResponse } from "packages/contracts";

export async function fetchHistoryWeatherFromApi(
  params: string
): Promise<HistoryWeatherResponse> {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`/api/history-weather?${query}`);

  if (!response.ok) throw new Error("Failed to fetch history weather");
  return response.json();
}

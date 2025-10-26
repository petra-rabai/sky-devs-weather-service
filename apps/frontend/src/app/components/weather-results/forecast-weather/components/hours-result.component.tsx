import HourlyTempChart from "./hourly-temp-chart.component";

export type Hour = {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  snow_cm: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
};

interface Props {
  hours: Hour[];
}

export const HoursResult: React.FC<Props> = ({ hours }) => {
  if (!hours || hours.length === 0) return null;

  return (
    <>
      {/* Chart view for Celsius */}
      <HourlyTempChart hours={hours} height={220} />

      {/* Existing table/list rendering below */}
      {/* ...existing rendering of hours... */}
    </>
  );
};

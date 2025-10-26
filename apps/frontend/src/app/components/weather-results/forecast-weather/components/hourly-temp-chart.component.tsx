import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { parseISO, parse, format, isValid } from "date-fns";

type Hour = {
  time: string;
  temp_c: number;
  temp_f: number;
};

interface Props {
  hours: Hour[];
  height?: number;
}

const formatTimeLabel = (time: string): string => {
  if (!time) return "";
  // Try ISO first (e.g. "YYYY-MM-DDTHH:MM:SSZ" or "YYYY-MM-DDTHH:MM")
  let date = parseISO(time);
  if (!isValid(date)) {
    // Fallback for "YYYY-MM-DD HH:MM"
    date = parse(time, "yyyy-MM-dd HH:mm", new Date());
  }
  if (!isValid(date)) {
    // Last-resort heuristic
    if (time.includes("T")) return time.split("T")[1].slice(0, 5);
    if (time.includes(" ")) return time.split(" ")[1].slice(0, 5);
    return time;
  }
  return format(date, "HH:mm");
};

export const HourlyTempChart: React.FC<Props> = ({ hours, height = 200 }) => {
  if (!hours || hours.length === 0) return null;

  const data_celsius = hours.map((h) => ({
    time: formatTimeLabel(h.time),
    temp_c: h.temp_c,
  }));

  const data_fahrenheit = hours.map((h) => ({
    time: formatTimeLabel(h.time),
    temp_f: h.temp_f,
  }));

  return (
    <div style={{ width: "100%", height }}>
      <h4>Hourly temperature - °C</h4>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data_celsius}
          margin={{ top: 10, right: 16, left: 0, bottom: 6 }}
        >
          <CartesianGrid stroke="#f0f0f0" />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis
            dataKey="temp_c"
            unit="°C"
            tick={{ fontSize: 12 }}
            domain={["dataMin - 2", "dataMax + 2"]}
          />
          <Tooltip formatter={(value: number) => `${value} °C`} />
          <Line
            type="monotone"
            dataKey="temp_c"
            stroke="#211f1eff"
            strokeWidth={3}
            dot={{ r: 2 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <h4>Hourly temperature - °F</h4>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data_fahrenheit}
          margin={{ top: 8, right: 16, left: 0, bottom: 4 }}
        >
          <CartesianGrid stroke="#f0f0f0" />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis
            dataKey="temp_f"
            unit="°F"
            tick={{ fontSize: 12 }}
            domain={["dataMin - 2", "dataMax + 2"]}
          />
          <Tooltip formatter={(value: number) => `${value} °F`} />
          <Line
            type="monotone"
            dataKey="temp_f"
            stroke="#211f1eff"
            strokeWidth={3}
            dot={{ r: 2 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HourlyTempChart;

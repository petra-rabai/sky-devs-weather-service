import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Form, Row } from "react-bootstrap";

export type Settings =
  | {
      type: "alerts";
      unit: "on" | "off";
      id: "forecast-weather-alerts-settings";
      dataTest: "forecast-weather-alerts-settings";
      name: "forecast-weather-alerts";
      title: "Weather Alerts";
      icon: IconDefinition;
      label: "On" | "Off";
    }
  | {
      type: "aqi";
      unit: "on" | "off";
      id: "forecast-weather-aqi-settings";
      dataTest: "forecast-weather-aqi-settings";
      name: "forecast-weather-aqi";
      title: "Air Quality Index";
      icon: IconDefinition;
      label: "On" | "Off";
    };

interface ForecastWeatherSettingsProps {
  settingsType: Settings;
  onSettingChange?: (name: string, settingsState: "on" | "off") => void;
}

export const ForecastWeatherSettings: React.FC<
  ForecastWeatherSettingsProps
> = ({ settingsType, onSettingChange }) => {
  const [unit, setUnit] = useState<"on" | "off">(settingsType.unit);
  const [label, setLabel] = useState<string>(settingsType.label);

  const handleChange = () => {
    const selectedSetting: "on" | "off" = unit === "on" ? "off" : "on";

    const updatedLabel = selectedSetting === "on" ? "On" : "Off";

    setUnit(selectedSetting);
    setLabel(updatedLabel);
    onSettingChange?.(settingsType.name, selectedSetting);
  };
  return (
    <Row className="d-flex align-items-center mb-2">
      <span className="text-muted me-2">
        <FontAwesomeIcon className="me-1" icon={settingsType.icon} size="xs" />{" "}
        {settingsType.title}:
      </span>
      <div className="d-flex">
        <div id="switcher" className="d-flex gap-3 p-2 align-items-center">
          <Form.Switch
            id={settingsType.id}
            data-test={settingsType.dataTest}
            value={unit}
            label={label}
            name={settingsType.name}
            checked={unit === "on"}
            onChange={handleChange}
          />
        </div>
      </div>
    </Row>
  );
};

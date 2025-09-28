"use client";
import React from "react";
import { Form, Card, Row, Col } from "react-bootstrap";
import { Switcher, SwitcherType, TemperatureSwitcher } from "./components";
import {
  faCloudSun,
  faDatabase,
  faHistory,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./weather-mod.module.css";

type WeatherModeSelectorProps = {
  onSwitcherChange: (name: string, value: "on" | "off") => void;
};

export const WeatherModeSelector: React.FC<WeatherModeSelectorProps> = ({
  onSwitcherChange,
}) => {
  const handleSwitcher =
    (name: string) => (value: "on" | "off" | "C" | "F") => {
      if (value === "on" || value === "off") {
        onSwitcherChange(name, value);
      }
    };

  const historicalWeatherMode: SwitcherType = {
    type: "historical",
    unit: "off",
    id: "historical-weather-switcher",
    dataTest: "historical-weather-switcher",
    name: "historical-weather",
    title: "Historical Weather",
    icon: faHistory,
    label: "Off",
  };

  const databaseMode: SwitcherType = {
    type: "database",
    unit: "off",
    id: "database-switcher",
    dataTest: "database-switcher",
    name: "database",
    title: "Database",
    icon: faDatabase,
    label: "Off",
  };

  const currentWeatherMode: SwitcherType = {
    type: "current",
    unit: "off",
    id: "current-weather-switcher",
    dataTest: "current-weather-switcher",
    name: "current-weather",
    title: "Current Weather",
    icon: faSun,
    label: "Off",
  };

  const forecastWeatherMode: SwitcherType = {
    type: "forecast",
    unit: "off",
    id: "forecast-weather-switcher",
    dataTest: "forecast-weather-switcher",
    name: "forecast-weather",
    title: "Forecast Weather",
    icon: faCloudSun,
    label: "Off",
  };

  return (
    <div id="weather-mod" className={`${styles.weathermod}`}>
      <Card className="ms-lg-3 me-lg-3 mb-4 mt-4 p-2">
        <div className="d-flex justify-content-center ms-lg-3">
          <Form className="p-4 d-flex flex-column">
            <Form.Group className="mb-3 text-center">
              <Form.Label className="text-center">
                Weather Information Search Mode
              </Form.Label>
            </Form.Group>
            <Form.Group className="m-2">
              <Row className="flex flex-wrap gap-5 justify-start items-center">
                <Col xs={6} sm={6} md={3} lg={2}>
                  <Switcher
                    switcherType={currentWeatherMode}
                    onUnitChange={handleSwitcher("current-weather")}
                  />
                </Col>
                <Col xs={6} sm={6} md={3} lg={2}>
                  <Switcher
                    switcherType={forecastWeatherMode}
                    onUnitChange={handleSwitcher("forecast-weather")}
                  />
                </Col>
                <Col xs={6} sm={6} md={3} lg={2}>
                  <Switcher
                    switcherType={historicalWeatherMode}
                    onUnitChange={handleSwitcher("historical-weather")}
                  />
                </Col>
                <Col xs={6} sm={6} md={3} lg={2}>
                  <Switcher
                    switcherType={databaseMode}
                    onUnitChange={handleSwitcher("database")}
                  />
                </Col>
                <Col xs={6} sm={6} md={3} lg={2}>
                  <TemperatureSwitcher
                    onUnitChange={(unit) => console.log("Temp unit:", unit)}
                  />
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </div>
      </Card>
    </div>
  );
};

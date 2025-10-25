import {
  faCloud,
  faGlobe,
  faTriangleExclamation,
  faDashboard,
  faBell,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Form, Row, Container } from "react-bootstrap";
import React, { ReactNode, useState } from "react";
import { ForecastWeatherResponse } from "@weather/contracts";

import {
  validateSearchInput,
  getSearchParamsQuery,
} from "../../utils/search.helper";
import { WeatherDisplay } from "../../../weather-results/weather-result-display.component";
import { fetchForecastWeatherFromApi } from "../../../../services/forecast-weather.service";
import { ForecastWeatherSettings } from "./components/forecast-weather-settings.component";

export const ForecastWeatherSearch: React.FC = () => {
  const [searchMode, setSearchMode] = useState<"city" | "iata" | "geo">("city");
  const [lat] = useState("");
  const [lon] = useState("");
  const [days, setDay] = useState("1");
  const [weather, setWeather] = useState<{
    data: ForecastWeatherResponse | null;
    error: string;
  }>({
    data: null,
    error: "",
  });
  React.useEffect(() => {
    setSearchModeText("");
    setLanguageCode("");
    setError("");
  }, [searchMode]);
  const [searchModeText, setSearchModeText] = useState("");
  const [languageCode, setLanguageCode] = useState("");
  const [error, setError] = useState("");

  const validateSearchParams = (e: React.FormEvent) => {
    e.preventDefault();
    const { valid, error } = validateSearchInput(searchMode, searchModeText);

    if (!valid) {
      setError(error!);
      return false;
    }
    setError("");
    return true;
  };

  const handleSearch = async () => {
    setError("");
    const params = getSearchParamsQuery({
      searchMode,
      searchModeText,
      lat,
      lon,
      days: days || "1",
      languageCode,
      alerts: switcherStates["forecast-weather-alerts"] === "on",
      aqi: switcherStates["forecast-weather-aqi"] === "on",
    });

    const forecastWeatherData = await fetchForecastWeatherFromApi(params);
    setWeather({ data: forecastWeatherData, error: "" });
  };

  const [switcherStates, setSwitcherStates] = useState<
    Record<string, "on" | "off">
  >({
    "forecast-weather-aqi": "off",
    "forecast-weather-alerts": "off",
  });
  const handleSwitcherChange = (name: string, value: "on" | "off") => {
    setSwitcherStates((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div id="forecast-weather" className="m-2">
      <Card>
        <Card.Header className="text-center">
          <FontAwesomeIcon className="me-2" icon={faCloud} size="xs" />
          Forecast Weather Search
        </Card.Header>
        <Card.Body>
          <Card.Title>How to use to get forecast data</Card.Title>
          <Card.Text>
            Fill the weather location field with one of the following
            parameters:{" "}
          </Card.Text>
          <ul>
            <li>City name</li>
            <li>IATA code</li>
            <li>Latitude, Longitude</li>
          </ul>
          <Card.Text>
            You can also select the number of days for the forecast.{" "}
            <strong>1-3 days</strong>
          </Card.Text>
          <Card.Text>
            Optionally, you can also fill the language code field. Example: hu
          </Card.Text>
          <Card.Text>Default language is english. Example: hu</Card.Text>
        </Card.Body>
      </Card>
      <div className="my-5 p-4 border-2 rounded-2">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            if (validateSearchParams(e)) {
              handleSearch();
            }
          }}
          className="mb-2"
        >
          <Form.Group>
            <div className="my-3">
              <h6 className="mb-3">Settings</h6>
              <Row className="mb-2">
                <ForecastWeatherSettings
                  settingsType={{
                    type: "alerts",
                    unit: switcherStates["forecast-weather-alerts"],
                    id: "forecast-weather-alerts-settings",
                    dataTest: "forecast-weather-alerts-settings",
                    name: "forecast-weather-alerts",
                    title: "Weather Alerts",
                    icon: faBell,
                    label:
                      switcherStates["forecast-weather-alerts"] === "on"
                        ? "On"
                        : "Off",
                  }}
                  onSettingChange={handleSwitcherChange}
                />
                <ForecastWeatherSettings
                  settingsType={{
                    type: "aqi",
                    unit: switcherStates["forecast-weather-aqi"],
                    id: "forecast-weather-aqi-settings",
                    dataTest: "forecast-weather-aqi-settings",
                    name: "forecast-weather-aqi",
                    title: "Air Quality Index",
                    icon: faSmog,
                    label:
                      switcherStates["forecast-weather-aqi"] === "on"
                        ? "On"
                        : "Off",
                  }}
                  onSettingChange={handleSwitcherChange}
                />
              </Row>
            </div>
            <Row className="g-2 align-items-center">
              <Col xs={12} md={6}>
                <Form.Label>Weather Location</Form.Label>
              </Col>
              <Col xs={12} md={4}>
                <Form.Label>Language Code</Form.Label>
              </Col>
              <Col xs={12} md={2}>
                <Form.Label>&nbsp;</Form.Label>
              </Col>
            </Row>
            <Container fluid="ms" className="mb-2 ">
              <Row className="align-items-center">
                <Col md="auto">
                  <Form.Check>
                    <Form.Check.Input
                      type="radio"
                      id="search-by-city"
                      name="search-by"
                      data-testid="city"
                      value="city"
                      checked={searchMode === "city"}
                      onChange={() => setSearchMode("city")}
                    />
                    <Form.Check.Label className="ps-2" htmlFor="search-by-city">
                      {" "}
                      City
                    </Form.Check.Label>
                  </Form.Check>
                </Col>
                <Col md="auto">
                  <Form.Check.Input
                    type="radio"
                    id="search-by-iata"
                    data-testid="iata"
                    name="search-by"
                    value="iata"
                    checked={searchMode === "iata"}
                    onChange={() => setSearchMode("iata")}
                  />
                  <Form.Check.Label className="ps-2" htmlFor="search-by-iata">
                    {" "}
                    IATA code
                  </Form.Check.Label>
                </Col>
                <Col md="auto">
                  <Form.Check.Input
                    type="radio"
                    id="search-by-geo"
                    name="search-by"
                    data-testid="geo"
                    value="geo"
                    checked={searchMode === "geo"}
                    onChange={() => setSearchMode("geo")}
                  />
                  <Form.Check.Label className="ps-2" htmlFor="search-by-geo">
                    {" "}
                    Geolocation
                  </Form.Check.Label>
                </Col>
              </Row>
            </Container>
            <Row className="g-2 align-items-center">
              <Col xs={12} md={4}>
                <Form.Control
                  type="text"
                  value={searchModeText}
                  onChange={(e) => setSearchModeText(e.target.value)}
                  data-testid="search-input"
                  placeholder={
                    searchMode === "geo"
                      ? "Enter geolocation"
                      : searchMode === "iata"
                      ? "Enter IATA code"
                      : "Enter city name"
                  }
                />
              </Col>
              <Col xs={12} md={3}>
                <Form.Control
                  type="text"
                  value={languageCode}
                  onChange={(e) => setLanguageCode(e.target.value)}
                  data-testid="language-input"
                  placeholder="Enter language code"
                />
              </Col>
              <Col xs={12} md={3}>
                <Form.Select
                  value={days}
                  onChange={(e) => setDay(e.target.value)}
                >
                  <option value="1">1 Day</option>
                  <option value="2">2 Days</option>
                  <option value="3">3 Days</option>
                </Form.Select>
              </Col>
              <Col></Col>
              <Col xs={12} md={2}>
                <Button
                  type="submit"
                  data-testid="search-button"
                  variant="dark"
                  size="sm"
                  className="w-100"
                >
                  <FontAwesomeIcon className="me-2" icon={faGlobe} size="xs" />
                  Search
                </Button>
              </Col>
            </Row>
            <Row className="g-2 align-items-center">
              <Col xs={12} md={6}>
                {error && (
                  <div
                    id="error-message"
                    data-testid="error-message"
                    className="text-danger mt-2"
                  >
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      className="me-2"
                    />
                    {error}
                  </div>
                )}
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </div>

      <div>
        {weather.data && (
          <div id="weather-display" className="weather-display">
            <h5>
              {" "}
              <FontAwesomeIcon icon={faDashboard} className="me-2" />
              Weather Data
            </h5>
            <WeatherDisplay data={{ forecastWeather: weather.data }} />
          </div>
        )}
        {weather.error && (
          <div className="text-danger">
            <FontAwesomeIcon icon={faTriangleExclamation} className="me-2" />
            {weather.error}
          </div>
        )}
      </div>
    </div>
  );
};

const ForeCastWeatherSearchNode: ReactNode = <ForecastWeatherSearch />;
export default ForeCastWeatherSearchNode;

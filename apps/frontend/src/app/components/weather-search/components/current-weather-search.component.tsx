"use client";
import {
  faDashboard,
  faGlobe,
  faSun,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import styles from "../weather-search.module.css";
import React, { ReactNode, useState } from "react";
import {
  getSearchParamsQuery,
  validateSearchInput,
} from "../utils/search.helper";
import { WeatherDisplay } from "../../weather-results/weather-result-display.component";
import { CurrentWeatherResponse } from "@weather/contracts";
import { fetchCurrentWeatherFromApi } from "../../../services/current-weather.service";

export const CurrentWeatherSearch: React.FC = () => {
  const [searchMode, setSearchMode] = useState<"city" | "iata" | "geo">("city");
  const [lat] = useState("");
  const [lon] = useState("");
  const [weather, setWeather] = useState<{
    data: CurrentWeatherResponse | null;
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
      languageCode,
    });

    const currentWeatherData = await fetchCurrentWeatherFromApi(params);
    setWeather({ data: currentWeatherData, error: "" });
  };

  return (
    <div id="current-weather" className={`${styles.weathersearch}`}>
      <Card>
        <Card.Header className="text-center">
          <FontAwesomeIcon className="me-2" icon={faSun} size="xs" />
          Current Weather Search
        </Card.Header>
        <Card.Body>
          <Card.Title>How to use to get current weather data</Card.Title>
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
            Optionally, you can also fill the language code field. Example: hu{" "}
          </Card.Text>
          <Card.Text>Default language is English. Example: hu</Card.Text>
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
              <Col xs={12} md={6}>
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
              <Col xs={12} md={4}>
                <Form.Control
                  type="text"
                  value={languageCode}
                  onChange={(e) => setLanguageCode(e.target.value)}
                  data-testid="language-input"
                  placeholder="Enter language code"
                />
              </Col>
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
            <WeatherDisplay data={{ currentWeather: weather.data }} />
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

const CurrentWeatherSearchNode: ReactNode = <CurrentWeatherSearch />;
export default CurrentWeatherSearchNode;

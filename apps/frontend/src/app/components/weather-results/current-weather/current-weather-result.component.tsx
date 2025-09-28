import React from "react";
import { LocationInfo } from "../global/location-result.component";
import { TemperatureInfo, WeatherCondition, WindInfo } from "./components";
import { CurrentWeatherResponse } from "@weather/contracts/current-weather.contract";
import { Col, Row } from "react-bootstrap";

interface Props {
  data: CurrentWeatherResponse;
}

export const CurrentWeatherDisplay: React.FC<Props> = ({ data }) => (
  <>
    {data && data.current && (
      <div>
        <Row>
          <Col xs={12} md={6}>
            <LocationInfo location={data.location} />
          </Col>
          <Col xs={12} md={6}>
            {" "}
            <WeatherCondition condition={data.current.condition} />
          </Col>
          <Col xs={12} md={6}>
            <TemperatureInfo {...data.current} />
          </Col>
          <Col xs={12} md={6}>
            <WindInfo {...data.current} />
          </Col>
        </Row>
      </div>
    )}
  </>
);

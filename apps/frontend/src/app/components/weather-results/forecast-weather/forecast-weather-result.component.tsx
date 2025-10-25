import { ForecastWeatherResponse } from "packages/contracts/dist";
import { Col, Row } from "react-bootstrap";
import {
  WeatherCondition,
  TemperatureInfo,
  WindInfo,
} from "../current-weather/components";
import { LocationInfo } from "../global/location-result.component";
import { AlertsResult } from "./components/alerts-result.component";

interface Props {
  data: ForecastWeatherResponse;
}

export const ForecastWeatherResultDisplay: React.FC<Props> = ({ data }) => (
  <>
    {data && data.location && data.alerts && (
      <div>
        <Row>
          <Col xs={12} md={6}>
            <LocationInfo location={data.location} />
          </Col>
          <Col xs={12} md={6}>
            {" "}
            <WeatherCondition condition={data.current.condition} />
            <AlertsResult alert={data.alerts!.alert!} />
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

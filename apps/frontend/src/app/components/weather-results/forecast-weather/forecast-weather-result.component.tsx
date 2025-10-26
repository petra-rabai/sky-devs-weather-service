import { ForecastWeatherResponse } from "packages/contracts/dist";
import { Col, Row } from "react-bootstrap";
import { LocationInfo } from "../global/location-result.component";
import { AlertsResult } from "./components/alerts-result.component";
import { HoursResult } from "./components/hours-result.component";

interface Props {
  data: ForecastWeatherResponse;
}

export const ForecastWeatherResultDisplay: React.FC<Props> = ({ data }) => (
  <>
    {data && data.location && (
      <div>
        <Row>
          <Col xs={12} md={6}>
            <LocationInfo location={data.location} />
          </Col>
          <Col xs={12} md={6}>
            {" "}
            {data.alerts && <AlertsResult alerts={data.alerts.alert} />}
          </Col>
          <Col xs={12} md={6}>
            {data.forecast.forecastday[0].hour && (
              <HoursResult hours={data.forecast.forecastday[0].hour} />
            )}
          </Col>
          <Col xs={12} md={6}></Col>
        </Row>
      </div>
    )}
  </>
);

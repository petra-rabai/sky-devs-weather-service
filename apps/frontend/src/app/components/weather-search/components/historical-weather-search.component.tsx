import { faGlobe, faHistory } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import styles from "../weather-search.module.css";

export const HistoricalWeatherSearch: React.FC = () => {
  return (
    <div id="historical-weather" className={`${styles.weathersearch}`}>
      <Card>
        <Card.Header className="text-center">
          <FontAwesomeIcon className="me-2" icon={faHistory} size="xs" />
          Historical Weather Search
        </Card.Header>
        <Card.Body>
          <Card.Title>How to use to get historical data</Card.Title>
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
            You can also select the number of days for the historical data.{" "}
            <strong>1-7 days</strong>
          </Card.Text>
          <Card.Text>
            Optionally, you can also fill the language code field. Example: hu
          </Card.Text>
          <Card.Text>Default language is english. Example: hu</Card.Text>
        </Card.Body>
      </Card>
      <div className="my-5 p-4 border-2 rounded-2">
        <Form className="mb-2">
          <Form.Group>
            <Row className="g-2 align-items-center">
              <Col xs={12} md={4}>
                <Form.Control
                  type="text"
                  placeholder="Enter weather location"
                />
              </Col>
              <Col xs={12} md={3}>
                <Form.Control type="text" placeholder="Enter language code" />
              </Col>
              <Col xs={12} md={3}>
                <Form.Select defaultValue="1">
                  <option value="1">1 Day</option>
                  <option value="2">2 Days</option>
                  <option value="3">3 Days</option>
                  <option value="4">4 Days</option>
                  <option value="5">5 Days</option>
                  <option value="6">6 Days</option>
                  <option value="7">7 Days</option>
                </Form.Select>
              </Col>
              <Col xs={12} md={2}>
                <Button
                  variant="dark"
                  size="sm"
                  className="w-100"
                  onClick={() => console.log("Search")}
                >
                  <FontAwesomeIcon className="me-2" icon={faGlobe} size="xs" />
                  Search
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

import { faDatabase, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import styles from "../weather-search.module.css";

export const DatabaseSearch: React.FC = () => {
  return (
    <div id="database" className={`${styles.weathersearch}`}>
      <Card>
        <Card.Header className="text-center">
          <FontAwesomeIcon className="me-2" icon={faDatabase} size="xs" />
          Stored Weather Information
        </Card.Header>
        <Card.Body>
          <Card.Title>
            How to get current weather data from the information store.
          </Card.Title>
          <Card.Text>
            You can also get current weather data from the information store.
            Fill the search parameters and click on the Find button.{" "}
          </Card.Text>
        </Card.Body>
      </Card>
      <div className="my-5 p-4 border-2 rounded-2">
        <Form className="mb-2">
          <Form.Group>
            <Row className="g-2 align-items-center">
              <Col xs={12} md={6}>
                <Form.Control
                  type="text"
                  placeholder="Enter weather location"
                />
              </Col>
              <Col xs={12} md={4}>
                <Form.Control type="date" placeholder="Enter date" />
              </Col>
              <Col xs={12} md={2}>
                <Button
                  variant="dark"
                  size="sm"
                  className="w-100"
                  onClick={() => console.log("Find")}
                >
                  <FontAwesomeIcon className="me-2" icon={faSearch} size="xs" />
                  Find
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

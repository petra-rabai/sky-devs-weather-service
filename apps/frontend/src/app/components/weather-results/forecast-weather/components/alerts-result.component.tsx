import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Badge } from "react-bootstrap";
import { format } from "date-fns";

export type Alert = {
  areas: string;
  category: string;
  certainty: string;
  desc: string;
  effective: string;
  event: string;
  expires: string;
  headline: string;
  identifier: string;
  instruction: string;
  msgtype: string;
  note: string;
  severity: "Minor" | "Moderate" | "Severe" | "Extreme";
  urgency: "Immediate" | "Expected" | "Future" | "Past";
};

interface Props {
  alert: Alert;
}

export const AlertsResult: React.FC<Props> = ({ alert }) => (
  <div className="alert-result my-4">
    <h5 className="mb-3">
      <FontAwesomeIcon
        icon={faTriangleExclamation}
        className="me-2 text-warning"
      />
      Weather Alert
    </h5>
    <Table responsive striped hover className="align-middle">
      <tbody>
        <tr>
          <th className="w-25">Event</th>
          <td>{alert.event}</td>
        </tr>
        <tr>
          <th>Headline</th>
          <td>{alert.headline}</td>
        </tr>
        <tr>
          <th>Description</th>
          <td>{alert.desc}</td>
        </tr>
        <tr>
          <th>Instructions</th>
          <td>{alert.instruction}</td>
        </tr>
        <tr>
          <th>Area</th>
          <td>{alert.areas}</td>
        </tr>
        <tr>
          <th>Status</th>
          <td>
            <div className="d-flex gap-2 align-items-center flex-wrap">
              <Badge
                bg={
                  alert.severity === "Minor"
                    ? "success"
                    : alert.severity === "Moderate"
                    ? "warning"
                    : alert.severity === "Severe"
                    ? "danger"
                    : "dark"
                }
              >
                Severity: {alert.severity}
              </Badge>
              <Badge
                bg={
                  alert.urgency === "Immediate"
                    ? "danger"
                    : alert.urgency === "Expected"
                    ? "warning"
                    : alert.urgency === "Future"
                    ? "info"
                    : "secondary"
                }
              >
                Urgency: {alert.urgency}
              </Badge>
              <Badge bg="info">Certainty: {alert.certainty}</Badge>
            </div>
          </td>
        </tr>
        <tr>
          <th>Time Period</th>
          <td>
            <div>
              <strong>From:</strong> {format(new Date(alert.effective), "PPpp")}
            </div>
            <div>
              <strong>Until:</strong> {format(new Date(alert.expires), "PPpp")}
            </div>
          </td>
        </tr>
        <tr>
          <th>Category</th>
          <td>{alert.category}</td>
        </tr>
        <tr>
          <th>Message Type</th>
          <td>{alert.msgtype}</td>
        </tr>
        {alert.note && (
          <tr>
            <th>Additional Notes</th>
            <td>{alert.note}</td>
          </tr>
        )}
        <tr>
          <th>Alert ID</th>
          <td>
            <code>{alert.identifier}</code>
          </td>
        </tr>
      </tbody>
    </Table>
  </div>
);

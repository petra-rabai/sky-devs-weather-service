import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Badge } from "react-bootstrap";
import { format } from "date-fns";

export type Alert = {
  headline: string;
  msgtype: string;
  severity: string;
  urgency: string;
  areas: string;
  category: string;
  certainty: string;
  event: string;
  note: string;
  effective: string;
  expires: string;
  desc: string;
  instruction: string;
};
interface Props {
  alerts: Alert[];
}

export const AlertsResult: React.FC<Props> = ({ alerts }) => {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="alert-result my-4">
      <h5 className="mb-3">
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          className="me-2 text-warning"
        />
        Weather Alert{alerts.length > 1 ? "s" : ""}
      </h5>
      {alerts.map((a, idx) => (
        <Table key={idx} responsive striped hover className="align-middle mb-4">
          <tbody>
            <tr>
              <th className="w-25">Event</th>
              <td>{a.event}</td>
            </tr>
            <tr>
              <th>Headline</th>
              <td>{a.headline}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{a.desc}</td>
            </tr>
            <tr>
              <th>Instructions</th>
              <td>{a.instruction}</td>
            </tr>
            <tr>
              <th>Area</th>
              <td>{a.areas}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>
                <div className="d-flex gap-2 align-items-center flex-wrap">
                  <Badge
                    bg={
                      a.severity === "Minor"
                        ? "success"
                        : a.severity === "Moderate"
                        ? "warning"
                        : a.severity === "Severe"
                        ? "danger"
                        : "dark"
                    }
                  >
                    Severity: {a.severity}
                  </Badge>
                  <Badge
                    bg={
                      a.urgency === "Immediate"
                        ? "danger"
                        : a.urgency === "Expected"
                        ? "warning"
                        : a.urgency === "Future"
                        ? "info"
                        : "secondary"
                    }
                  >
                    Urgency: {a.urgency}
                  </Badge>
                  <Badge bg="info">Certainty: {a.certainty}</Badge>
                </div>
              </td>
            </tr>
            <tr>
              <th>Time Period</th>
              <td>
                <div>
                  <strong>From:</strong> {format(new Date(a.effective), "PPpp")}
                </div>
                <div>
                  <strong>Until:</strong> {format(new Date(a.expires), "PPpp")}
                </div>
              </td>
            </tr>
            <tr>
              <th>Category</th>
              <td>{a.category}</td>
            </tr>
            <tr>
              <th>Message Type</th>
              <td>{a.msgtype}</td>
            </tr>
            {a.note && (
              <tr>
                <th>Additional Notes</th>
                <td>{a.note}</td>
              </tr>
            )}
          </tbody>
        </Table>
      ))}
    </div>
  );
};

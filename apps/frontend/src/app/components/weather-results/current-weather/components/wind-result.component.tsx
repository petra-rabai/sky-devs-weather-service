import { faWind } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Table } from 'react-bootstrap';

interface Props {
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  gust_mph: number;
  gust_kph: number;
}

export const WindInfo: React.FC<Props> = ({
  wind_mph,
  wind_kph,
  wind_degree,
  wind_dir,
  gust_mph,
  gust_kph,
}) => (
  <section>
    <h5>
      {' '}
      <FontAwesomeIcon className="me-2" icon={faWind} size="xs" />
      Wind
    </h5>
    <Table className="table table-bordered table-striped w-auto">
      <tbody>
        <tr>
          <td>Speed:</td>
          <td>
            {wind_kph} kph / {wind_mph} mph
          </td>
        </tr>
        <tr>
          <td>Direction:</td>
          <td>
            {wind_dir} ({wind_degree}°)
          </td>
        </tr>
        <tr>
          <td>Gusts:</td>
          <td>
            {gust_kph} kph / {gust_mph} mph
          </td>
        </tr>
      </tbody>
    </Table>
  </section>
);

import { faTemperature1 } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Table } from 'react-bootstrap';

interface Props {
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  heatindex_c: number;
  heatindex_f: number;
  windchill_c: number;
  windchill_f: number;
}

export const TemperatureInfo: React.FC<Props> = ({
  temp_c,
  temp_f,
  feelslike_c,
  feelslike_f,
  heatindex_c,
  heatindex_f,
  windchill_c,
  windchill_f,
}) => (
  <section>
    <h5>
      <FontAwesomeIcon className="me-2" icon={faTemperature1} size="xs" />
      Temperature
    </h5>
    <Table className="table table-bordered table-striped w-auto">
      <tbody>
        <tr>
          <th scope="row">Actual</th>
          <td>
            {' '}
            {temp_c}°C / {temp_f}°F
          </td>
        </tr>
        <tr>
          <th scope="row">Feels like: </th>
          <td>
            {' '}
            {feelslike_c}°C / {feelslike_f}°F
          </td>
        </tr>
        <tr>
          <th scope="row">Heat index: </th>
          <td>
            {' '}
            {heatindex_c}°C / {heatindex_f}°F
          </td>
        </tr>
        <tr>
          <th scope="row">Wind Chill: </th>
          <td>
            {' '}
            {windchill_c}°C / {windchill_f}°F
          </td>
        </tr>
      </tbody>
    </Table>
  </section>
);

import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Table } from 'react-bootstrap';

interface Props {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime: string;
  };
}

export const LocationInfo: React.FC<Props> = ({ location }) => {
  return (
    <section className="my-4">
      <h5>
        <FontAwesomeIcon className="me-2" icon={faLocation} size="xs" />
        Location Information
      </h5>
      <Table className="table table-bordered table-striped w-auto">
        <tbody>
          <tr>
            <th scope="row">City</th>
            <td>{location.name}</td>
          </tr>
          <tr>
            <th scope="row">Region</th>
            <td>{location.region}</td>
          </tr>
          <tr>
            <th scope="row">Country</th>
            <td>{location.country}</td>
          </tr>
          <tr>
            <th scope="row">Latitude</th>
            <td>{location.lat}</td>
          </tr>
          <tr>
            <th scope="row">Longitude</th>
            <td>{location.lon}</td>
          </tr>
          <tr>
            <th scope="row">Timezone</th>
            <td>{location.tz_id}</td>
          </tr>
          <tr>
            <th scope="row">Local Time</th>
            <td>{location.localtime}</td>
          </tr>
        </tbody>
      </Table>
    </section>
  );
};

import { faCloudMoonRain } from '@fortawesome/free-solid-svg-icons/faCloudMoonRain';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Image } from 'react-bootstrap';

interface Props {
  condition: {
    text: string;
    icon: string;
  };
}

export const WeatherCondition: React.FC<Props> = ({ condition }) => (
  <section>
    <h5>
      <FontAwesomeIcon className="me-2" icon={faCloudMoonRain} size="xs" />
      Condition
    </h5>
    <Image
      src={condition.icon.startsWith('http') ? condition.icon : `https:${condition.icon}`}
      alt={condition.text}
      width={50}
      height={50}
      className="me-2"
      style={{ verticalAlign: 'middle' }}
    />
    <p>{condition.text}</p>
  </section>
);

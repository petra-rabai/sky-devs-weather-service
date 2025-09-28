'use client';

import React, { useState } from 'react';
import { Form, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperature0 } from '@fortawesome/free-solid-svg-icons';

interface TemperatureSwitcherProps {
  onUnitChange?: (unit: 'C' | 'F') => void;
}

export const TemperatureSwitcher: React.FC<TemperatureSwitcherProps> = ({ onUnitChange }) => {
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedUnit = e.target.value as 'C' | 'F';
    setUnit(selectedUnit);
    onUnitChange?.(selectedUnit);
  };

  return (
    <Row className="d-flex align-items-center mb-2">
      <span className="text-muted me-2">
        <FontAwesomeIcon className="me-1" icon={faTemperature0} size="xs" /> Temperature Unit:
      </span>
      <div className="d-flex">
        <div id="temperature-switcher" className="d-flex gap-3 p-2 align-items-center">
          <Form.Switch
            id="temperature-switcher-c"
            data-test="temperature-switcher-c"
            label="°C"
            type="radio"
            value="C"
            name="temperature"
            checked={unit === 'C'}
            onChange={handleChange}
          />
          <Form.Switch
            id="temperature-switcher-f"
            data-test="temperature-switcher-f"
            label="°F"
            type="radio"
            value="F"
            name="temperature"
            checked={unit === 'F'}
            onChange={handleChange}
          />
        </div>
      </div>
    </Row>
  );
};

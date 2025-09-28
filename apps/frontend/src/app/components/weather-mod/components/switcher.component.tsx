import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Form, Row } from 'react-bootstrap';

export type SwitcherType =
  | {
      type: 'current';
      id: 'current-weather-switcher';
      unit: 'on' | 'off';
      dataTest: 'current-weather-switcher';
      name: 'current-weather';
      title: 'Current Weather';
      icon: IconDefinition;
      label: 'On' | 'Off';
    }
  | {
      type: 'historical';
      unit: 'on' | 'off';
      id: 'historical-weather-switcher';
      dataTest: 'historical-weather-switcher';
      name: 'historical-weather';
      title: 'Historical Weather';
      icon: IconDefinition;
      label: 'On' | 'Off';
    }
  | {
      type: 'forecast';
      unit: 'on' | 'off';
      id: 'forecast-weather-switcher';
      dataTest: 'forecast-weather-switcher';
      name: 'forecast-weather';
      title: 'Forecast Weather';
      icon: IconDefinition;
      label: 'On' | 'Off';
    }
  | {
      type: 'database';
      unit: 'on' | 'off';
      id: 'database-switcher';
      dataTest: 'database-switcher';
      name: 'database';
      title: 'Database';
      icon: IconDefinition;
      label: 'On' | 'Off';
    };

interface SwitcherProps {
  switcherType: SwitcherType;
  onUnitChange?: (switcherState: 'on' | 'off') => void;
}

export const Switcher: React.FC<SwitcherProps> = ({ switcherType, onUnitChange }) => {
  const [unit, setUnit] = useState<'on' | 'off'>(switcherType.unit);
  const [label, setLabel] = useState<string>(switcherType.label);

  const handleChange = () => {
    let selectedUnit: 'on' | 'off' = unit === 'on' ? 'off' : 'on';

    selectedUnit = unit === 'on' ? 'off' : 'on';

    const updatedLabel = selectedUnit === 'on' ? 'On' : 'Off';

    setUnit(selectedUnit);
    setLabel(updatedLabel);
    onUnitChange?.(selectedUnit);
  };

  return (
    <Row className="d-flex align-items-center mb-2">
      <span className="text-muted me-2">
        <FontAwesomeIcon className="me-1" icon={switcherType.icon} size="xs" /> {switcherType.title}
        :
      </span>
      <div className="d-flex">
        <div id="switcher" className="d-flex gap-3 p-2 align-items-center">
          <Form.Switch
            id={switcherType.id}
            data-test={switcherType.dataTest}
            value={unit}
            label={label}
            name={switcherType.name}
            checked={unit === 'on'}
            onChange={handleChange}
          />
        </div>
      </div>
    </Row>
  );
};

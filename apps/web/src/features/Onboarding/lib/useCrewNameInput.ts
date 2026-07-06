import { useState } from 'react';

import { MAX_CREW_NAME_LENGTH } from '@/shared/constants/crew';

export const VALID_CREW_NAME_REGEX = /^[가-힣a-zA-Z0-9]*$/;

export function useCrewNameInput(defaultValue = '') {
  const [crewName, setCrewName] = useState(defaultValue);
  const [crewNameError, setCrewNameError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, '');
    if (value.length > MAX_CREW_NAME_LENGTH) {
      value = value.substring(0, MAX_CREW_NAME_LENGTH);
    }
    setCrewName(value);
    if (crewNameError) setCrewNameError('');
  };

  const handleRemove = () => {
    setCrewName('');
    setCrewNameError('');
  };

  return {
    crewName,
    crewNameError,
    setCrewNameError,
    handleChange,
    handleRemove,
  };
}

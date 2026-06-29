import { useState } from 'react';

import { MAX_CREW_NAME_LENGTH } from '@/shared/constants/crew';

export function useCrewNameInput(defaultValue = '') {
  const [crewName, setCrewName] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, '');
    if (value.length > MAX_CREW_NAME_LENGTH) {
      value = value.substring(0, MAX_CREW_NAME_LENGTH);
    }
    setCrewName(value);
  };

  const handleRemove = () => {
    setCrewName('');
  };

  return {
    crewName,
    handleChange,
    handleRemove,
  };
}

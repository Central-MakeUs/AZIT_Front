import { useState } from 'react';

import {
  MAX_CREW_NAME_LENGTH,
  RESERVED_CREW_NAME_KEYWORDS,
} from '@/shared/constants/crew';

const VALID_CREW_NAME_REGEX = /^[가-힣a-zA-Z0-9]*$/;

function containsReservedKeyword(name: string): boolean {
  const lowered = name.toLowerCase();
  return RESERVED_CREW_NAME_KEYWORDS.some((keyword) =>
    lowered.includes(keyword.toLowerCase())
  );
}

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

  const validate = () => {
    if (!VALID_CREW_NAME_REGEX.test(crewName)) {
      setCrewNameError('특수문자는 사용할 수 없어요.');
      return false;
    }
    if (containsReservedKeyword(crewName)) {
      setCrewNameError('사용할 수 없는 단어가 포함되어 있어요.');
      return false;
    }
    return true;
  };

  return {
    crewName,
    crewNameError,
    handleChange,
    handleRemove,
    validate,
  };
}

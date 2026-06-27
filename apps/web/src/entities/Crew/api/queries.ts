import { mutationOptions } from '@tanstack/react-query';

import { postCreateCrew } from './postCreateCrew';
import { postJoinCrew } from './postJoinCrew';

export const crewEntityQueries = {
  createCrew: mutationOptions({ mutationFn: postCreateCrew }),
  joinCrew: mutationOptions({ mutationFn: postJoinCrew }),
};

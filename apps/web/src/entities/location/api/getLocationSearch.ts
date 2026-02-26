import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

import type { LocationSearchResponse } from '../model/location.model';

export const getLocationSearch = (query: string) => {
  return auth.get<ApiResponse<LocationSearchResponse[]>>(
    END_POINT.LOCATION.SEARCH,
    { searchParams: { query } }
  );
};

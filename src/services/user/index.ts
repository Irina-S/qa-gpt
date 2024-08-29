import { $api } from '@/api/axios';
import type { GetUserProfileResponse } from './types';

export const getUserProfile = () => {
  return $api.get<GetUserProfileResponse>('/get-user-profile');
};

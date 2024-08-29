import type { UserDto, GetUserProfileResponse } from '@/services/user/types';

export interface UserState {
  isAuthorized: boolean;
  profile: Partial<UserDto> & Pick<GetUserProfileResponse, 'isAdmin'>;
  isLoading: boolean;
  isAdminMode: boolean;
}

export interface UserDto {
  id: string;
  login: string;
}

export interface GetUserProfileResponse {
  userDto: UserDto;
  roles: string[];
  isAdmin: boolean;
}

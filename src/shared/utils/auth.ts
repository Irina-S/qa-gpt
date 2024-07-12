import { USER_AUTHORIZED_KEY } from '../const';

export const isLoggedIn = () => {
  const isAuthenticated = localStorage.getItem(USER_AUTHORIZED_KEY);
  return Boolean(isAuthenticated);
};

export const setLoggedIn = () => {
  localStorage.setItem(USER_AUTHORIZED_KEY, '1');
};

export const setLoggedOut = () => {
  localStorage.removeItem(USER_AUTHORIZED_KEY);
};

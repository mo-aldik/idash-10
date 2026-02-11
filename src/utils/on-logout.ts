import { LocalStorageKeys, URL } from './constants';

export const onLogout = () => {
  localStorage.removeItem(LocalStorageKeys.access_token);
  window.location.href = URL.LOGIN;
};

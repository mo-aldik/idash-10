import { useMemo, useState } from 'react';
import { LocalStorageKeys } from 'utils/constants';

export const useIsLoggedIn = (): boolean => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const accessToken = localStorage.getItem(LocalStorageKeys.access_token);

  useMemo(() => {
    if (accessToken) return setIsLoggedIn(true);
    return setIsLoggedIn(false);
  }, [accessToken]);

  return isLoggedIn;
};

import { useIsLoggedIn } from 'hooks/use-is-logged-in';
import { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { URL } from 'utils/constants';

interface PreLoginRouteProps {
  component: JSX.Element;
}

export const PreLoginRoute = ({ component }: PreLoginRouteProps) => {
  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn) {
    return <Navigate to={URL.HOME} />;
  }

  return component;
};

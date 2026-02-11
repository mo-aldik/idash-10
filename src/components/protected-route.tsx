import { useIsLoggedIn } from 'hooks/use-is-logged-in';
import { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { URL } from 'utils/constants';

interface ProtectedRouteProps {
  component: JSX.Element;
}

export const ProtectedRoute = ({ component }: ProtectedRouteProps) => {
  const isLoggedIn = useIsLoggedIn();

  if (!isLoggedIn) {
    return <Navigate to={URL.LOGIN} />;
  }

  return component;
};

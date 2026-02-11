import { PreLoginRoute } from 'components/pre-login-route';
import { ProtectedRoute } from 'components/protected-route';
import LoginPage from 'pages/login';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { URL } from 'utils/constants';
import HomePage from './pages/home';
import NotFoundPage from './pages/not-found';

function App() {
  const { NOT_FOUND } = URL;

  return (
    <Routes>
      <Route path='/'>
        {/* PRE LOGIN */}
        <Route element={<PreLoginRoute component={<Outlet />} />}>
          <Route path='login' element={<LoginPage />} />
        </Route>

        {/* DEFAULT ROUTE */}
        <Route element={<ProtectedRoute component={<Outlet />} />}>
          <Route index element={<HomePage />} />
        </Route>

        {/* NOT FOUND */}
        <Route path='404' element={<NotFoundPage />} />
        <Route path='*' element={<Navigate to={NOT_FOUND} />} />
      </Route>
    </Routes>
  );
}

export default App;

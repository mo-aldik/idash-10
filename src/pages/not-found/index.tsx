import { LogoIcon } from 'icons/logo-icon';
import { Layout } from 'layouts';
import { useNavigate } from 'react-router-dom';
import { URL } from 'utils/constants';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <LogoIcon onClick={() => navigate(URL.HOME)} />
    </Layout>
  );
};
export default NotFoundPage;

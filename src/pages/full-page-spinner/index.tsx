import { Spinner } from '@chakra-ui/react';
import { LogoIcon } from 'icons/logo-icon';
import { Layout } from 'layouts';

const FullPageSpinner = () => {
  return (
    <Layout>
      <LogoIcon />
      <Spinner size='lg' color='danger' />
    </Layout>
  );
};
export default FullPageSpinner;

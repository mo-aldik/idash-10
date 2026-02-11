import { Container, HStack, Image } from '@chakra-ui/react';
import loginImg from '../assets/login.png';
import { LayoutProps } from './types';

export const PreLoginLayout = ({ sections }: LayoutProps) => {
  return (
    <Container as={HStack} justifyItems={'center'} p={4} w={'full'} dir='rtl' minH={'100vh'} gap={'6'}>
      <Image display={['none', 'none', 'none', 'flex']} src={loginImg} />

      {sections}
    </Container>
  );
};

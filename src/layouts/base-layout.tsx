// @ts-nocheck

import { Container, HStack, Menu, Portal, VStack } from '@chakra-ui/react';
import { LogoIcon } from 'icons/logo-icon';
import { CircleIcon } from 'pages/home/icons/circle-icon';
import { onLogout } from 'utils/on-logout';
import { LayoutProps } from './types';

export const BaseLayout = ({ sections }: LayoutProps) => {
  return (
    <Container p={4} as={VStack} alignItems={'stretch'} w={'full'} dir='rtl' gap={'6'}>
      <HStack gap={4} justify={'space-between'}>
        <LogoIcon />

        <Menu.Root>
          <Menu.Trigger asChild>
            <CircleIcon cursor={'pointer'} _hover={{ opacity: 0.8 }} />
          </Menu.Trigger>

          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item onClick={onLogout} value='export'>
                  Logout
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </HStack>

      {sections}
    </Container>
  );
};

import { ReactNode } from 'react';
import { BlankLayout } from './blank-layout';
import { PreLoginLayout } from './pre-login-layout';
import { BaseLayout } from './base-layout';

interface LayoutProps {
  type?: 'base_layout' | 'pre_login_layout' | 'blank_layout';
  children?: ReactNode;
}

export const Layout = ({ type, children }: LayoutProps) => {
  switch (type) {
    case 'base_layout':
      return <BaseLayout sections={children} />;

    case 'blank_layout':
      return <BlankLayout sections={children} />;

    case 'pre_login_layout':
      return <PreLoginLayout sections={children} />;

    default:
      return <BlankLayout sections={children} />;
  }
};

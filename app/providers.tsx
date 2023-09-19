'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';

type Props = {
  children?: React.ReactNode;
};

// eslint-disable-next-line import/prefer-default-export
export function NextAuthProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}

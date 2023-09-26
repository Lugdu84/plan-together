import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      firstName?: string;
    } & DefaultSession['user'];
  }

  interface User {
    firstName?: string;
  }
}

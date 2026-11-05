'use client';

import { SessionProvider, useSession } from 'next-auth/react';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export function useAuth() {
  const { data: session, status } = useSession();
  const user = session?.user
    ? {
        ...session.user,
        uid: (session.user as any).id || (session.user as any).uid || session.user.email,
      }
    : null;

  return {
    user,
    userProfile: session?.user || null,
    loading: status === 'loading',
  };
}


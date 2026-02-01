'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuthStore } from '@/features/auth/auth.store';
import api from '@/lib/axios';
import type { AuthUser } from '@/types/auth';

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const setHydrated = useAuthStore((state) => state.setHydrated);

  useEffect(() => {
    let isMounted = true;

    const isAuthUser = (value: unknown): value is AuthUser => {
      if (!value || typeof value !== 'object') return false;
      const user = value as AuthUser;
      return (
        typeof user.id === 'number' &&
        typeof user.username === 'string' &&
        typeof user.email === 'string' &&
        typeof user.firstName === 'string' &&
        typeof user.lastName === 'string'
      );
    };

    const loadSession = async () => {
      try {
        const response = await api.get<{ user: unknown }>('/api/auth/me', { baseURL: '' });
        const data = response.data;
        if (isMounted && isAuthUser(data.user)) {
          setUser(data.user);
        }
      } finally {
        if (isMounted) {
          setHydrated();
        }
      }
    };

    loadSession();
    return () => {
      isMounted = false;
    };
  }, [setHydrated, setUser]);

  return children;
}

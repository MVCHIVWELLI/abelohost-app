import type { AuthSession, AuthUser, LoginRequest } from '@/types/auth';

export type AuthPayload = {
  user: AuthUser;
};

export const login = async (payload: LoginRequest): Promise<AuthPayload> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as { message?: string };
    throw new Error(data.message ?? 'Login failed');
  }

  const data = (await response.json()) as AuthSession;
  return { user: data.user };
};

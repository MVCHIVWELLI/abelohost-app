import axios from 'axios';
import type { AuthSession, AuthUser, LoginRequest } from '@/types/auth';

export type AuthPayload = {
  user: AuthUser;
};

export const login = async (payload: LoginRequest): Promise<AuthPayload> => {
  try {
    const response = await axios.post<AuthSession>('/api/auth/login', payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    return { user: response.data.user };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data as { message?: string } | undefined;
      throw new Error(data?.message ?? 'Login failed');
    }
    throw error;
  }
};

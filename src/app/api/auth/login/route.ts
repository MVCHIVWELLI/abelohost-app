import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';
import type { LoginRequest, LoginResponse, AuthUser } from '@/types/auth';
import { AUTH_COOKIE_NAME, authCookieOptions } from '@/app/api/auth/login/authCookie';
import api from '@/lib/axios';

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as LoginRequest;

  let data: LoginResponse;
  try {
    const response = await api.post<LoginResponse>('auth/login', payload, {
    });
    data = response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const errorData = error.response?.data ?? {};
      return NextResponse.json(errorData, { status });
    }
    throw error;
  }

  const token = data.accessToken ?? data.token ?? '';

  if (!token) {
    return NextResponse.json({ message: 'Auth token missing.' }, { status: 500 });
  }

  const user: AuthUser = {
    id: data.id,
    username: data.username,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    image: data.image,
  };

  const result = NextResponse.json({ user });
  result.cookies.set(AUTH_COOKIE_NAME, token, authCookieOptions);
  return result;
}

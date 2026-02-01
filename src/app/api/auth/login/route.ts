import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { LoginRequest, LoginResponse, AuthUser } from '@/types/auth';
import { AUTH_COOKIE_NAME, authCookieOptions } from '@/lib/authCookie';

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as LoginRequest;

  const response = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    return NextResponse.json(data, { status: response.status });
  }

  const data = (await response.json()) as LoginResponse;
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

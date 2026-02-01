import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { AuthUser } from '@/types/auth';
import { AUTH_COOKIE_NAME } from '@/app/api/auth/login/authCookie';

type DummyMeResponse = AuthUser;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
  }

  const response = await fetch('https://dummyjson.com/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return NextResponse.json({ message: 'Session invalid' }, { status: 401 });
  }

  const data = (await response.json()) as DummyMeResponse;
  const user: AuthUser = {
    id: data.id,
    username: data.username,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    image: data.image,
  };

  return NextResponse.json({ user });
}

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import api from '@/lib/axios';
import type { AuthUser } from '@/types/auth';
import { AUTH_COOKIE_NAME } from '@/app/api/auth/login/authCookie';

type DummyMeResponse = AuthUser;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
  }

  let data: DummyMeResponse;
  try {
    const response = await api.get<DummyMeResponse>('auth/me');
    data = response.data;
  } catch {
    return NextResponse.json({ message: 'Session invalid' }, { status: 401 });
  }
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

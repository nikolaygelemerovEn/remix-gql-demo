import { compare, hash } from 'bcryptjs';

import { createCookieSessionStorage, redirect } from '@remix-run/node';

import type { AuthData, ErrorData, UserData } from '~/types';

import { prisma } from './database.server';

const sessionStorage = createCookieSessionStorage({
  cookie: {
    // 30 days,
    httpOnly: true,

    maxAge: 30 * 24 * 60 * 60,

    sameSite: 'lax',

    secrets: [process.env.SESSION_SECRET || ''],
    secure: process.env.NODE_ENV === 'production'
  }
});

export const createUserSession = async (user: UserData, redirectPath: string) => {
  const session = await sessionStorage.getSession();

  session.set('userId', user.id);
  session.set('userEmail', user.email);

  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session)
    }
  });
};

export const getUserFromSession = async (request: Request) => {
  if (!request) {
    return null;
  }

  const session = sessionStorage.getSession(request.headers.get('Cookie'));

  const userId = (await session).get('userId');
  const userEmail = (await session).get('userEmail');

  if (!userId || !userEmail) {
    return null;
  }

  return { email: userEmail, id: userId };
};

export const destroyUserSession = async (request: Request) => {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'));

  return redirect('/', {
    headers: { 'Set-Cookie': await sessionStorage.destroySession(session) }
  });
};

export const requireUserSession = async (request: Request) => {
  const userId = await getUserFromSession(request);

  if (!userId) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw redirect('/auth?mode=login');
  }

  return userId;
};

export const signup = async ({ email, password }: AuthData) => {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    const error: ErrorData = new Error('userExists');
    error.status = 422;

    throw error;
  }

  const passwordHash = await hash(password, 12);

  const user = await prisma.user.create({
    data: { email, password: passwordHash }
  });

  return user;
};

export const login = async ({ email, password }: AuthData) => {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (!existingUser) {
    const error: ErrorData = new Error('invalidCredentials');
    error.status = 401;

    throw error;
  }

  const passwordCorrect = await compare(password, existingUser.password);

  if (!passwordCorrect) {
    const error: ErrorData = new Error('invalidCredentials');
    error.status = 401;

    throw error;
  }

  return existingUser;
};

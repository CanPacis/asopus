import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import { User } from 'pages/api/user';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from 'util/session';
import { InferGetServerSidePropsType } from 'next';
import { getServerSideProps } from 'pages/profile';

export function useUser({ redirectTo = '', redirectIfFound = false } = {}) {
  const { data: user, mutate: mutateUser } = useSWR<User>('/api/user');

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}

export const withSsrUser = withIronSessionSsr(async ({ req, res }) => {
  const { user } = req.session;

  const emptyUser = {
    isLoggedIn: false,
    id: '',
    email: '',
    username: '',
    name: '',
    verified: false,
    avatar: '',
  };

  if (user === undefined && req.url !== '/login') {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
    return {
      props: {
        user: emptyUser,
      },
    };
  }

  if (user !== undefined && req.url === '/login') {
    res.setHeader('location', '/');
    res.statusCode = 302;
    res.end();
    return { props: { user } };
  }

  return {
    props: { user: user ?? emptyUser },
  };
}, sessionOptions);

export type UserProps = InferGetServerSidePropsType<typeof getServerSideProps>;

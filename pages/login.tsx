import { FormEvent } from 'react';
import { TextInput } from '@mantine/core';
import { useUser, withSsrUser } from 'util/auth';
import { useForm } from '@mantine/form';
import fetchJson from 'util/fetch-json';

import { User } from './api/user';

export default function Login() {
  const { mutateUser } = useUser({
    redirectTo: '/profile',
    redirectIfFound: true,
  });

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length > 6 ? null : 'Password must be at least 6 characters'),
    },
  });

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const validation = form.validate();

    if (!validation.hasErrors) {
      const response = await fetchJson<User>('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'can_pacis', password: '0123456789' }),
      });

      mutateUser(response);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="login">
          <TextInput
            withAsterisk
            label="Email or Username"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />
          <br />
          <TextInput
            withAsterisk
            label="Password"
            placeholder="password"
            {...form.getInputProps('password')}
          />
          <br />
          <span>{form.isTouched() && form.errors.password}</span>
          <br />
          <button type="submit">Click</button>
        </div>
      </form>
    </>
  );
}

export const getServerSideProps = withSsrUser;

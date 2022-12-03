import { withSsrUser, UserProps } from 'util/auth';

export default function Profile({ user }: UserProps) {
  return (
    <div>
      <h1>Your GitHub profile</h1>

      {user?.isLoggedIn && (
        <>
          <p style={{ fontStyle: 'italic' }}>
            {user.name} is logged in with the email {user.email}
          </p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
    </div>
  );
}

export const getServerSideProps = withSsrUser;

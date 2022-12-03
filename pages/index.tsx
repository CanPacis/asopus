import { withSsrUser } from 'util/auth';

export default function HomePage() {
  return (
    <div>home</div>
  );
}

export const getServerSideProps = withSsrUser;

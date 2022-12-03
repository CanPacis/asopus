import { useRouter } from 'next/router';
import { Sinope as SinopeComponent } from 'components/Sinope/Sinope';
import { withSsrUser } from 'util/auth';

export default function Sinope() {
  const router = useRouter();
  const { id } = router.query;

  return <SinopeComponent id={id as string} />;
}

export const getServerSideProps = withSsrUser;

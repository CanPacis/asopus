import { AppShell } from '@mantine/core';
import { AppNavbar } from 'components/Navbar/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      padding="md"
      navbar={<AppNavbar />}
      styles={(theme) => ({
        main: {
          WebkitFlex: '1',
          paddingTop: 'var(--mantine-header-height, 0px)',
          paddingBottom: 'var(--mantine-footer-height, 0px)',
          paddingLeft: 'var(--mantine-navbar-width, 0px)',
          paddingRight: 0,
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
    >
      {children}
      <div id="cursor-pool" />
    </AppShell>
  );
}

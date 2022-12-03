import { useState } from 'react';
import NextApp, { AppProps, AppContext } from 'next/app';
import { getCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider, MantineTheme } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import Layout from 'components/Layout/Layout';
import { RecoilRoot } from 'recoil';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <>
      <Head>
        <title>Asopus</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <RecoilRoot>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider
            theme={{
              colorScheme,
              globalStyles: (theme) => ({
                body: {
                  overflow: 'hidden',
                },
                '.cursor': {
                  color: 'white',
                  padding: 4,
                  borderRadius: theme.radius.sm,
                  fontSize: theme.fontSizes.xs,
                  borderBottomLeftRadius: 0,
                  transform: 'translateY(-10px)',

                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 24,
                    left: 0,
                    width: 1.5,
                    height: 24,
                    backgroundColor: 'var(--bg-color)',
                  },
                },
              }),
              components: {
                Tooltip: {
                  defaultProps: {
                    withArrow: true,
                    sx: (theme: MantineTheme) => ({
                      backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[6],
                    }),
                  },
                },
              },
            }}
            withGlobalStyles
            withNormalizeCSS
          >
            <NotificationsProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </RecoilRoot>
    </>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'dark',
  };
};

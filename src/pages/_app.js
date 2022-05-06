import { useCallback } from 'react';
import App from 'next/app';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { appWithTranslation } from 'next-i18next';

//local imports
import nextI18NextConfig from '../../next-i18next.config';
import { createEmotionCache, Mapper } from 'utils';
import lightTheme from 'styles/theme/lightTheme';
import 'styles/globals.css';

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { pathname, push } = useRouter();
  const { Component, emotionCache = clientSideEmotionCache, pageProps, user } = props;

  const Layout = Mapper.layouts[Component.layout] || ((children) => <>{children}</>);

  const Render = useCallback(() => {
    if (Component.isAuthProtect && !user) typeof window !== 'undefined' && push('/auth/login');

    if (pathname.includes('auth') && !!user) typeof window !== 'undefined' && push('/');
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }, [Component, user]);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Render />
      </ThemeProvider>
    </CacheProvider>
  );
};

//pass global props
MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const user = null;
  return { ...appProps, user };
};

export default appWithTranslation(MyApp, nextI18NextConfig);

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired
};

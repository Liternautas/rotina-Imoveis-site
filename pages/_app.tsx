import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Script from 'next/script';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const CssBaseline = dynamic(() => import('@mui/material/CssBaseline'), {
  loading: () => null,
});

const AdminTemplate = dynamic(() => import('@/src/ui/templates/admin'), {
  loading: () => null,
});

const Header = dynamic(() => import('@/src/ui/components/Header'), {
  loading: () => null,
});

const Footer = dynamic(() => import('@/src/ui/components/Footer'), {
  loading: () => null,
});

const FilterProvider = dynamic(() => import('@/src/contexts/FilterContext'), {
  loading: () => null,
});

const AuthProvider = dynamic(() => import('@/src/contexts/AuthContext'), {
  loading: () => null,
});

import 'react-notifications-component/dist/theme.css';
import 'swiper/css';
import '@/styles/globals.css';
import "react-datepicker/dist/react-datepicker.css";

import { theme } from '@/styles/theme';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';
import { ThemeProvider } from '@mui/material/styles';
import { ReactNotifications } from 'react-notifications-component';
import { HeadComponent } from '@/src/ui/components/HeadComponent';
import { AlertTerms } from '@/src/ui/components/AlertTerms';
import { Loading } from '@/src/ui/components/Loading';

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App({ Component, pageProps: { session, ...pageProps } }: MyAppProps) {
  const { emotionCache = clientSideEmotionCache } = pageProps;
  const router = useRouter();
  const { asPath } = router;
  const [muiLoaded, setMuiLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeStart", () => setLoading(true));
    router.events.on("routeChangeComplete", () => setLoading(false));
    router.events.on("routeChangeError", () => setLoading(false));

    return () => {
      router.events.off("routeChangeStart", () => setLoading(true));
      router.events.off("routeChangeComplete", () => setLoading(false));
      router.events.off("routeChangeError", () => setLoading(false));
    };
  }, [router.events]);

  useEffect(() => {
    emotionCache && setMuiLoaded(true);
  }, [emotionCache]);

  if (!muiLoaded) return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, background: '#000' }}
      open={!muiLoaded}
    >
      {/* <HeadComponent /> */}
      <CircularProgress color="inherit" />
    </Backdrop>
  )

  return (
    <CacheProvider value={emotionCache}>
      <HeadComponent />
      <Script
        id="my-script"
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-V5N0W25XXP"
      />
      <Script
        id="my-script-html"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());

                            gtag('config', 'G-V5N0W25XXP');
                    `
        }}
      />
      <Script
        id="my-script"
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=UA-263614559-1"
      />
      <Script
        id="my-script-html"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());

                            gtag('config', 'UA-263614559-1');
                    `
        }}
      />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <FilterProvider>
            <Loading open={loading} />
            {!asPath.startsWith('/admin') && !asPath.startsWith('/login') && asPath != '/area-do-cliente/login' ? <Header /> : null}
            {asPath.startsWith('/admin') ?
              <AdminTemplate>
                <Component {...pageProps} />
              </AdminTemplate>
              :
              <Component {...pageProps} />
            }
            <AlertTerms />
            <ReactNotifications />
            {!asPath.startsWith('/admin') && !asPath.startsWith('/login') && asPath != '/area-do-cliente/login' ? <Footer /> : null}
          </FilterProvider>
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

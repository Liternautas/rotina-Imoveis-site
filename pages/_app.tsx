import dynamic from 'next/dynamic';
import Head from 'next/head'
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import {Backdrop, CircularProgress} from '@mui/material';

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

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App({ Component, pageProps: { session, ...pageProps } }: MyAppProps) {
  const { emotionCache = clientSideEmotionCache } = pageProps;
  const router = useRouter();
  const { asPath } = router;
  const [muiLoaded, setMuiLoaded] = useState(false);

  useEffect(() => {
    emotionCache && setMuiLoaded(true);
  }, [emotionCache]);

  if (!muiLoaded) return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={!muiLoaded}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <FilterProvider>
            {!asPath.startsWith('/admin') && !asPath.startsWith('/login') ? <Header /> : null}
            {asPath.startsWith('/admin') ?
              <AdminTemplate>
                <Component {...pageProps} />
              </AdminTemplate>
              :
              <Component {...pageProps} />
            }
            <ReactNotifications />
            {!asPath.startsWith('/admin') && !asPath.startsWith('/login') ? <Footer /> : null}
          </FilterProvider>
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

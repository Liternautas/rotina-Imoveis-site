import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app'

import { AuthProvider } from '@/src/contexts/AuthContext';

const CssBaseline = dynamic(() => import('@mui/material/CssBaseline'), {
  loading: () => <p>Loading...</p>,
});

const ThemeProvider = dynamic(() => import('@mui/material/styles/ThemeProvider'), {
  loading: () => <p>Loading...</p>,
});

const AdminTemplate = dynamic(() => import('@/src/ui/templates/admin'), {
  loading: () => <p>Loading...</p>,
});

const Header = dynamic(() => import('@/src/ui/components/Header'), {
  loading: () => <p>Loading...</p>,
});

const Footer = dynamic(() => import('@/src/ui/components/Footer'), {
  loading: () => <p>Loading...</p>,
});

import 'react-notifications-component/dist/theme.css';
import 'swiper/css';
import '@/styles/globals.css';
import "react-datepicker/dist/react-datepicker.css";

import {ReactNotifications} from "react-notifications-component";
import { FilterProvider } from '@/src/contexts/FilterContext';
import { theme } from '@/styles/theme';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App({ Component, pageProps: { session, ...pageProps } }: MyAppProps) {
  const { emotionCache = clientSideEmotionCache } = pageProps;
  const router = useRouter();
  const { asPath } = router;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <SessionProvider session={session}> */}
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
        {/* </SessionProvider> */}
      </ThemeProvider>
    </CacheProvider>
  )
}

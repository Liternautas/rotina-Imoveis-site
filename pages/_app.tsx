import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { AdminTemplate } from '@/src/templates/admin';
import { AuthProvider } from '@/src/contexts/AuthContext';
import { ReactNotifications } from 'react-notifications-component';
import { theme } from '@/styles/theme';
import { PropertyProvider } from '@/src/contexts/PropertyContext';
import { Header } from '@/src/components/Header';

import 'react-notifications-component/dist/theme.css';
import 'swiper/css';
import '@/styles/globals.css'
import { Footer } from '@/src/components/Footer';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const { asPath } = router;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SessionProvider session={session}>
        <AuthProvider>
          <PropertyProvider>
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
          </PropertyProvider>
        </AuthProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}

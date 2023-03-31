import { useRouter } from 'next/router';
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactNotifications } from 'react-notifications-component';

import { AuthProvider } from '@/src/contexts/AuthContext';
import { PropertyProvider } from '@/src/contexts/PropertyContext';
import { AdminTemplate } from '@/src/ui/templates/admin';
import { Header } from '@/src/ui/components/Header';
import { Footer } from '@/src/ui/components/Footer';
import { theme } from '@/styles/theme';

import 'react-notifications-component/dist/theme.css';
import 'swiper/css';
import '@/styles/globals.css';
import "react-datepicker/dist/react-datepicker.css";
import { FilterProvider } from '@/src/contexts/FilterContext';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const { asPath } = router;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SessionProvider session={session}>
        <AuthProvider>
          <FilterProvider>
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
          </FilterProvider>
        </AuthProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}

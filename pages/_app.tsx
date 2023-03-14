import '@/styles/globals.css'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { AdminTemplate } from '@/src/templates/admin';
import { AuthProvider } from '@/src/contexts/AuthContext';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const { asPath } = router;
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#daa520',
      },
      secondary: {
        main: '#2f4f4f'
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SessionProvider session={session}>
        <AuthProvider>
          {asPath.startsWith('/admin') ?
            <AdminTemplate>
              <Component {...pageProps} />
            </AdminTemplate>
            :
            <Component {...pageProps} />
          }
          <ReactNotifications />
        </AuthProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}

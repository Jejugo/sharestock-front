import React from 'react'
import GlobalStyles from '@styles/GlobalStyles'
import { AuthUserProvider } from '@context/AuthUserContext'
import { UserDataProvider } from '@context/UserDataContext'
import Fonts from '@components/Fonts'
import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Fonts()
  }, [])

  return (
    <AuthUserProvider>
      <UserDataProvider>
        <SnackbarProvider>
          <GlobalStyles />
          <Component {...pageProps} />
        </SnackbarProvider>
      </UserDataProvider>
    </AuthUserProvider>
  )
}

export default MyApp

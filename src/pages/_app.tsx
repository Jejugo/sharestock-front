import React from 'react'
import App from 'next/app'
import GlobalStyles from '@styles/GlobalStyles'
import { AuthUserProvider } from '@context/AuthUserContext'
import { UserDataProvider } from '@context/UserDataContext'
import initFirebase from '../firebase'
import Fonts from '@components/Fonts'
import { NextComponentType, NextPageContext } from 'next/types'
import { FirebaseApp } from 'firebase/app'
import { SnackbarProvider } from 'notistack'

interface IGetInitialProps {
  Component: NextComponentType<NextPageContext, any, any>
  ctx: NextPageContext
}

interface IApp {
  Component: NextComponentType<NextPageContext, any, any>
  pageProps: any
  app: FirebaseApp
}

const firebaseApp = initFirebase()
class MyApp extends App<IApp, any> {
  static async getInitialProps({ Component, ctx }: IGetInitialProps) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}

    return { pageProps, app: firebaseApp }
  }

  componentDidMount() {
    Fonts()
  }

  render() {
    const { Component, pageProps, app } = this.props
    const props = {
      ...pageProps,
      app
    }
    return (
      <AuthUserProvider>
        <UserDataProvider>
          <SnackbarProvider>
            <GlobalStyles />
            <Component {...props} />
          </SnackbarProvider>
        </UserDataProvider>
      </AuthUserProvider>
    )
  }
}

export default MyApp

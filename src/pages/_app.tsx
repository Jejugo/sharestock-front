import React from 'react'
import App from 'next/app'
import GlobalStyles from '../styles/GlobalStyles'
import { AuthUserProvider } from '../context/AuthUserContext'
import initFirebase from '../firebase'
import Fonts from '../components/Fonts'
import { NextComponentType, NextPageContext } from 'next/types'
import { FirebaseApp } from 'firebase/app'

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
class MyApp extends App<IApp, {}> {
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
        <GlobalStyles />
        <Component {...props} />
      </AuthUserProvider>
    )
  }
}

export default MyApp
//export default wrapper.withRedux(MyApp);

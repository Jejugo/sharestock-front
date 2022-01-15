import React from "react";
import App from "next/app";
import { Provider } from "react-redux";
import { wrapper } from "../_redux"

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <React.Fragment>
          <Component {...pageProps} />
      </React.Fragment>
    );
  }
}

export default wrapper.withRedux(MyApp);

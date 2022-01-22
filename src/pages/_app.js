import React from "react";
import App from "next/app";
import { wrapper } from "../_redux";

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
        <style jsx global>
          {`
            body,
            html {
              margin: 0px;
              color: white;
              background-color: #000000;
              font-family: "Baloo Bhaina 2", cursive;
              font-style: normal;
              font-display: swap;
              line-height: 3vh;
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}

export default wrapper.withRedux(MyApp);

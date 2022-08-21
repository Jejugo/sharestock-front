import React from "react";
import App from "next/app";
import { wrapper } from "../_redux";
import { AuthUserProvider } from '../context/AuthUserContext';
import initFirebase from '../firebase';
import Fonts from "../components/Fonts";

const app = initFirebase()
class MyApp extends App {
  
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps, app };
  }

  componentDidMount(){
    Fonts();
  }

  render() {
    const { Component, pageProps, app } = this.props;
    const props = {
      ...pageProps,
      app
    }
    return (
      <AuthUserProvider>
        <Component {...props} />
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
      </AuthUserProvider>
    );
  }
}

export default MyApp;
//export default wrapper.withRedux(MyApp);


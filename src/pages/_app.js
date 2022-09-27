import React from 'react';
import App from 'next/app';
import GlobalStyles from '../styles/GlobalStyles';
import { AuthUserProvider } from '../context/AuthUserContext';
import initFirebase from '../firebase';
import Fonts from '../components/Fonts';

const firebaseApp = initFirebase();
class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		const pageProps = Component.getInitialProps
			? await Component.getInitialProps(ctx)
			: {};

		return { pageProps, app: firebaseApp };
	}

	componentDidMount() {
		Fonts();
	}

	render() {
		const { Component, pageProps, app } = this.props;
		const props = {
			...pageProps,
			app,
		};
		return (
			<AuthUserProvider>
				<GlobalStyles />
				<Component {...props} />
			</AuthUserProvider>
		);
	}
}

export default MyApp;
//export default wrapper.withRedux(MyApp);

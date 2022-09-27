import LendingPageLayout from '../skeleton/LendingPageLayout';
import LoginComponent from '../components/Login';

const Login = () => {
	return (
		<section>
			<LendingPageLayout>
				<LoginComponent></LoginComponent>
			</LendingPageLayout>
		</section>
	);
};

export default Login;
import { useEffect } from 'react'
import Navbar from "../components/Navbar"
import LendingPageLayout from "../skeleton/LendingPageLayout"
import Fonts from "../components/Fonts"
import LoginComponent from "../components/Login"

const Login = () => {

    useEffect(() => {
        Fonts();
      }, []);

    return (
        <section>
            <LendingPageLayout>
                <LoginComponent></LoginComponent>
            </LendingPageLayout>
        </section>
    )
}

export default Login
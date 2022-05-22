import { useEffect } from 'react'
import Navbar from "../components/Navbar"
import TextLayout from "../skeleton/TextLayout"
import Fonts from "../components/Fonts"
import LoginComponent from "../components/Login"

const Login = () => {

    useEffect(() => {
        Fonts();
      }, []);

    return (
        <section>
            <Navbar></Navbar>
            <TextLayout>
                <LoginComponent></LoginComponent>
            </TextLayout>
        </section>
    )
}

export default Login
import { useEffect } from 'react'
import Navbar from "../components/Navbar"
import TextLayout from "../skeleton/TextLayout"
import Fonts from "../components/Fonts"
import SignupComponent from "../components/SignupComponent"

const Signup = () => {

    useEffect(() => {
        Fonts();
      }, []);

    return (
        <section>
            <Navbar></Navbar>
            <TextLayout>
                <SignupComponent></SignupComponent>
            </TextLayout>
        </section>
    )
}

export default Signup
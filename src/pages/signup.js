import { useEffect } from 'react'
import Fonts from "../components/Fonts"
import SignupComponent from "../components/SignupComponent"
import LendingPageLayout from "../skeleton/LendingPageLayout"

const Signup = () => {

    useEffect(() => {
        Fonts();
      }, []);

    return (
        <section>
            <LendingPageLayout>
                <SignupComponent></SignupComponent>
            </LendingPageLayout>
        </section>
    )
}

export default Signup
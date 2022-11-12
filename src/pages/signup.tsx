import React from 'react'
import SignupComponent from '../components/SignupComponent'
import LendingPageLayout from '@skeleton/LandingPageLayout'

const Signup = () => {
  return (
    <section>
      <LendingPageLayout>
        <SignupComponent></SignupComponent>
      </LendingPageLayout>
    </section>
  )
}

export default Signup

import React, { useEffect } from 'react'
import Template from '@layout/Template/Template'
import Steps from '@components/Steps/Steps'
import TextLayout from '@layout/TextLayout/TextLayout'
import Fonts from '@components/Fonts'

import { stockShareAnalysis as steps } from '@const/definitions'
import { StepsProvider } from '@context/StepsProvider'

const HowToStart = () => {
  useEffect(() => Fonts(), [])

  return (
    <>
      <Template tabTitle="Como começar">
        <TextLayout>
          <StepsProvider>
            <Steps steps={steps}></Steps>
          </StepsProvider>
        </TextLayout>
      </Template>
    </>
  )
}

export default HowToStart

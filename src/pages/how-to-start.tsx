import React, { useEffect, useState } from 'react'
import Template from '../layout/Template/Template'
import Steps from '../components/Steps/Steps'
import TextLayout from '../layout/TextLayout/TextLayout'
import Fonts from '../components/Fonts'

import { stockShareAnalysis as steps } from '../const/definitions'

const HowToStart = () => {
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    Fonts()
  }, [])

  const handleCountNext = () => {
    if (count < steps.length - 1) setCount((previousState) => previousState + 1)
  }

  const handleCountPrev = () => {
    if (count > 0) setCount((previousState) => previousState - 1)
  }

  return (
    <>
      <Template tabTitle="strategy">
        <TextLayout>
          <Steps
            steps={steps}
            count={count}
            handleCountNext={handleCountNext}
            handleCountPrev={handleCountPrev}
          ></Steps>
        </TextLayout>
      </Template>
    </>
  )
}

export default HowToStart

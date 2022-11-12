import React, { useEffect, useState } from 'react'
import Template from '../skeleton/Template/Template'
import Steps from '../components/Steps/Steps'
import TextLayout from '../skeleton/TextLayout/TextLayout'
import Fonts from '../components/Fonts'

import { StockShareAnalysis, stockShareAnalysis } from '../const/definitions'

const HowToStart = () => {
  const [steps] = useState<StockShareAnalysis[]>(stockShareAnalysis)
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
      <Template tabTitle={'strategy'}>
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

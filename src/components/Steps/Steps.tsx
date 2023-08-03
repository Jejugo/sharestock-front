import { StockShareAnalysis } from 'const/definitions'
import React from 'react'
import ArrowStep from '../ArrowStep/ArrowStep'
import * as S from './styles'
import { useStepsContext } from 'context/StepsProvider'

interface StepsProps {
  steps: StockShareAnalysis[]
}

export default function Steps({ steps }: StepsProps) {
  const { count, nextStep, prevStep } = useStepsContext()
  return (
    <S.StepsWrapper>
      <S.Steps>
        <S.Title>{steps[count].title}</S.Title>
        <S.Description>{steps[count].description}</S.Description>
        {/* <S.Explanation
          dangerouslySetInnerHTML={{ __html: steps[count].explanation }}
        ></S.Explanation> */}
      </S.Steps>
      <ArrowStep prevStep={prevStep} nextStep={nextStep}></ArrowStep>
    </S.StepsWrapper>
  )
}

import { StockShareAnalysis } from '@const/definitions'
import React from 'react'
import ArrowStep from '../ArrowStep/ArrowStep'
import * as S from './styles'

interface StepsProps {
  steps: StockShareAnalysis[]
  count: number
  handleCountNext: () => void
  handleCountPrev: () => void
}

export default function Steps({
  steps,
  count,
  handleCountNext,
  handleCountPrev
}: StepsProps) {
  return (
    <S.StepsWrapper>
      <S.Steps>
        <S.Title>{steps[count].title}</S.Title>
        <S.Description>{steps[count].description}</S.Description>
        <S.Explanation
          //@ts-ignore
          dangerouslySetInnerHTML={{ __html: steps[count].explanation }}
        ></S.Explanation>
      </S.Steps>
      <ArrowStep
        handleCountPrev={handleCountPrev}
        handleCountNext={handleCountNext}
      ></ArrowStep>
    </S.StepsWrapper>
  )
}

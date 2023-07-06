import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import * as S from './style'

interface ArrowsProps {
  nextStep: () => void
  prevStep: () => void
}

export default function Arrows({ nextStep, prevStep }: ArrowsProps) {
  return (
    <S.ArrowWrapper>
      <S.Arrow>
        <S.ArrowPrev onClick={prevStep}>
          <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
        </S.ArrowPrev>
        <S.ArrowNext onClick={nextStep}>
          <ArrowForwardIosIcon></ArrowForwardIosIcon>
        </S.ArrowNext>
      </S.Arrow>
    </S.ArrowWrapper>
  )
}

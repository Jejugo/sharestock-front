import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import * as S from './style'

interface ArrowsProps {
  handleCountNext: () => void
  handleCountPrev: () => void
}

export default function Arrows({
  handleCountNext,
  handleCountPrev
}: ArrowsProps) {
  return (
    <S.ArrowWrapper className="arrow-wrapper">
      <S.Arrow className="arrow">
        <S.ArrowPrev className="arrow__prev" onClick={handleCountPrev}>
          <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
        </S.ArrowPrev>
        <S.ArrowNext className="arrow__next" onClick={handleCountNext}>
          <ArrowForwardIosIcon></ArrowForwardIosIcon>
        </S.ArrowNext>
      </S.Arrow>
    </S.ArrowWrapper>
  )
}

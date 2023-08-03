import React, { useState } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

import * as S from './Slider.styles'

interface ISliderProps {
  children: React.ReactNode[]
}

const Slider: React.FC<ISliderProps> = ({ children }: ISliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === children.length - 1 ? 0 : prev + 1))
  }

  const previousSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? children.length - 1 : prev - 1))
  }

  return (
    <S.SliderWrapper>
      <S.Arrow onClick={previousSlide}>
        <ArrowBackIosNewIcon />
      </S.Arrow>

      <S.Slide>{children[activeIndex]}</S.Slide>

      <S.Arrow onClick={nextSlide}>
        <ArrowForwardIosIcon />
      </S.Arrow>
    </S.SliderWrapper>
  )
}
export default Slider

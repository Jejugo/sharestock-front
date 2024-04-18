import React, { FC } from 'react'
import * as S from './style'

interface TitleProps {
  text: string
  color?: string
  noMargin?: boolean
}

const Title: FC<TitleProps> = ({ text, color = 'white', noMargin = false }) => {
  return (
    <S.Text color={color} noMargin={noMargin}>
      {text}
    </S.Text>
  )
}

export default Title

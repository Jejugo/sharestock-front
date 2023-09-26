import React, { FC } from 'react'
import * as S from './style'

interface TitleProps {
  text: string
  color?: string
}

const Title: FC<TitleProps> = ({ text, color = 'white' }) => {
  return <S.Text color={color}>{text}</S.Text>
}

export default Title

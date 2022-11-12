import React from 'react'
import * as S from './style'

interface ITitle {
  text: string
}

export default function Title({ text }: ITitle) {
  return <S.Text>{text}</S.Text>
}

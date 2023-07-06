import React from 'react'
import * as S from './style'

export default function Title({ text }: { text: string }) {
  return <S.Text>{text}</S.Text>
}

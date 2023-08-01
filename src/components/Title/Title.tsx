import React from 'react'
import * as S from './style'

export default function Title({
  text,
  color
}: {
  text: string
  color?: string
}) {
  return <S.Text color={color}>{text}</S.Text>
}

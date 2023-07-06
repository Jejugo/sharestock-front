import React from 'react'
import * as S from './styles'

interface IButton {
  text: string
  size: S.ButtonSizes
  disabled?: boolean
  type?: S.ButtonTypes
  onClick?: () => Promise<any>
}
export default function Button({
  text,
  size,
  disabled = false,
  type = 'button',
  onClick
}: IButton) {
  return (
    <S.Button type={type} onClick={onClick} size={size} disabled={disabled}>
      {text}
    </S.Button>
  )
}

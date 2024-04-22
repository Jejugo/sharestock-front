import React from 'react'
import * as S from './styles'

interface IButton {
  text: string
  width: S.ButtonSizes | number | string
  height?: number | string
  disabled?: boolean
  type?: S.ButtonTypes
  onClick?: () => Promise<any> | VoidFunction
}
export default function Button({
  text,
  width,
  height,
  disabled = false,
  type = 'button',
  onClick
}: IButton) {
  return (
    <S.Button
      type={type}
      onClick={onClick}
      width={width}
      height={height}
      disabled={disabled}
    >
      {text}
    </S.Button>
  )
}

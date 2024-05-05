import React from 'react'
import * as S from './styles'

interface IButton {
  text: string
  variant?: 'primary' | 'secondary' | 'error' | 'outlined'
  width?: S.ButtonSizes | number | string
  height?: number | string
  disabled?: boolean
  type?: S.ButtonTypes
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
export default function Button({
  text,
  width,
  height,
  disabled = false,
  type = 'button',
  variant = 'primary',
  onClick,
  ...rest
}: IButton) {
  return (
    <S.Button
      type={type}
      variant={variant}
      onClick={onClick}
      width={width}
      height={height}
      disabled={disabled}
      {...rest}
    >
      {text}
    </S.Button>
  )
}

import React from 'react'
import * as S from './Input.styles'
import { CSSObject } from 'styled-components'

interface InputProps {
  placeholder?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  styles?: CSSObject
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  styles
}) => {
  return (
    <S.InputStyles
      styles={styles}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}
export default Input

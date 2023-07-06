import React from 'react'
import * as S from './Input.styles'

interface InputProps {
  placeholder?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({ placeholder, value, onChange }) => {
  return (
    <S.InputWrapper
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}
export default Input

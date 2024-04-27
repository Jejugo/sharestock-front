import { colors, radius } from '@styles/constants'
import styled, { CSSObject } from 'styled-components'

type InputStylesProps = {
  styles?: CSSObject
}

export const InputStyles = styled.input<InputStylesProps>`
  padding: 10px;
  background-color: ${colors.white}
  border-radius: 5px;
  box-sizing: border-box;
  border: none;
  font-size: 16px;
  font-weight: 400;
  width: 100%;
  box-shadow: 0 0 10px #cecece;
  outline: none;
  border-radius: ${radius.small}px;
  &:focus {
    border-color: #0074d9;
  }

  ${({ styles }) => styles}
`

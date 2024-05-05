import styled from 'styled-components'
import { colors, fonts } from '@styles/constants'

export type ButtonTypes = 'button' | 'submit' | 'reset'
export type ButtonSizes = 'small' | 'medium' | 'large'

interface Size {
  width?: ButtonSizes | number | string
  type: ButtonTypes
  height?: number | string
  variant?: 'primary' | 'secondary' | 'error' | 'outlined'
}

const sizeValues = {
  small: '100px',
  medium: '200px',
  large: '300px'
}

export const Button = styled.button<Size>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) =>
    sizeValues[props.width as ButtonSizes] || `${props.width}px`};
  height: ${(props) => (props.height ? `${props.height}px` : '100%')};
  color: ${(props) => {
    switch (props.variant) {
      case 'primary':
        return `${colors.black}`
      case 'secondary':
        return `${colors.white}`
      case 'error':
        return `${colors.white}`
      default:
        return `${colors.black}`
    }
  }};
  background-color: ${(props) => {
    switch (props.variant) {
      case 'primary':
        return `${colors.orange}`
      case 'secondary':
        return `${colors.blue}`
      case 'error':
        return `${colors.danger}`
      default:
        return `${colors.orange}`
    }
  }};
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-size: ${fonts.medium}px;

  &:hover {
    background-color: grey;
    color: white;
    transition: 0.2s ease;
  }
`

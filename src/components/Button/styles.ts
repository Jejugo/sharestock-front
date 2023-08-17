import styled from 'styled-components'
import { fonts } from 'styles/constants'

export type ButtonTypes = 'button' | 'submit' | 'reset'
export type ButtonSizes = 'small' | 'medium' | 'large'

interface Size {
  width: ButtonSizes | number
  type: ButtonTypes
  height?: number
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
  height: ${(props) => `${props.height}px` || 'auto'};
  background-color: #ffcd00;
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

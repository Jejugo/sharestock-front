import styled from 'styled-components'

export type ButtonTypes = 'button' | 'submit' | 'reset'
export type ButtonSizes = 'small' | 'medium' | 'large'

interface Size {
  size: ButtonSizes
  type: ButtonTypes
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
  width: ${(props) => sizeValues[props.size]};
  padding: 20px 0px;
  background-color: #ffcd00;
  cursor: pointer;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: grey;
    color: white;
    transition: 0.2s ease;
  }
`

import styled, { CSSObject } from 'styled-components'

interface TextProps {
  color?: string
  size?: string
  weight?: string
  style?: CSSObject
}

export const StyledText = styled.p<TextProps>`
  color: ${({ color }) => color || 'black'};
  font-size: ${({ size }) => size || '16px'};
  font-weight: ${({ weight }) => weight || 'normal'};
  ${({ style }) => style};
`

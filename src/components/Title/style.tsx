import styled from 'styled-components'
import { fonts } from '@styles/constants'

interface TitleProps {
  color?: string
  noMargin?: boolean
}

export const TitleText = styled.h1<TitleProps>`
  color: ${(props) => props.color};
  font-size: ${fonts.xxlarge}px;
  margin: ${(props) => (props.noMargin ? '0' : '20px 0px')};
`

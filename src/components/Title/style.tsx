import styled from 'styled-components'
import { fonts } from 'styles/constants'

export const Text = styled.h1`
  color: ${(props) => props.color || 'white'};
  font-size: ${fonts.title}px;
  margin: 5% 0px;
`

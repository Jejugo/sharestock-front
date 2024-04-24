import { fonts, colors } from '@styles/constants'
import styled from 'styled-components'

export const Tab = styled.div<{ active: boolean }>`
  padding: 10px;
  cursor: pointer;
  color: ${({ active }) =>
    active ? `${colors.white}` : `${colors.lightGrey}`};
  border-bottom: ${({ active }) => (active ? '2px solid #FFBB28' : 'none')};
  transition: 0.2s ease;
  cursor: pointer;

  ${({ active }) => active && `font-size: ${fonts.xlarge}px;`};
`

import styled from 'styled-components'

import { fonts } from '@styles/constants'

export const ToolTip = styled.div`
  color: black;
  padding: 10px 30px;
  background-color: white;
  font-size: ${fonts.medium}px;
`

export const TooltipTitle = styled.h1`
  font-size: ${fonts.xlarge}px;
  margin: 0;
  font-weight: bold;
`

export const TooltipList = styled.ul`
  margin: 0 auto;
  padding: 0;
`

export const TooltipTextWrapper = styled.div`
  margin: 10px 0px;
`

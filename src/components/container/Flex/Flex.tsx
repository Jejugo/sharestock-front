import React from 'react'
import styled, { CSSObject } from 'styled-components'

// Define FlexProps interface for TypeScript type checking
interface FlexProps {
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  gap?: number
  children: React.ReactNode
  styles?: CSSObject
}

// Styled component applying flexbox styles based on props
const StyledFlex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || 'row'};
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  align-items: ${(props) => props.alignItems || 'stretch'};
  flex-wrap: ${(props) => props.flexWrap || 'nowrap'};
  ${(props) => props.gap && `gap: ${props.gap}px;`}
  ${(props) => props.styles}
`

const Flex: React.FC<FlexProps> = (props) => {
  return <StyledFlex {...props}>{props.children}</StyledFlex>
}

export default Flex

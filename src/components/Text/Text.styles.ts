import styled, { CSSObject } from 'styled-components'

interface TextProps {
  ref?: React.RefObject<HTMLElement>
  color?: string
  size?: string
  weight?: string
  style?: CSSObject
  noMargin?: boolean
}

export const StyledText = styled.p<TextProps>`
  color: ${({ color }) => color || 'black'};
  font-size: ${({ size }) => size || '16px'};
  font-weight: ${({ weight }) => weight || 'normal'};
  ${({ style }) => style};
  ${({ noMargin }) => noMargin && 'margin: 0;'}
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer; // Indicates it's interactive (optional)
`

export const Tooltip = styled.div`
  visibility: hidden;
  background-color: black;
  color: white;
  text-align: center;
  border-radius: 6px;
  padding: 5px 10px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;

  /* Tooltip arrow */
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
`

export const TextContainer = styled.div`
  position: relative;
  max-width: 100%; // Ensure it does not exceed the bounding container

  &:hover ${Tooltip} {
    visibility: visible;
    opacity: 1;
  }
`

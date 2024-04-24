import styled from 'styled-components'
import { IFrameIndicator } from './interfaces'
import { colors } from '@styles/constants'

export const FrameItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid white;
  flex-basis: 15.5%;
  margin: 1% 1%;
  padding: 1%;
  height: 250px;
  transition: 0.3s ease-out;

  &:hover {
    background-color: grey;
    cursor: pointer;
    z-index: 2;
  }
`

export const FrameTitle = styled.h1`
  font-family: 'Amatic SC', cursive;
  font-size: 25px;
  margin: 0;
`

export const FramePrice = styled.h1`
  font-size: 20px;
  margin-top: 2%;
`

export const FrameIndicator = styled.p<IFrameIndicator>`
  margin: 0;
  ${(props) => {
    switch (props.status) {
      case 'good':
        return `${colors.success}`
      case 'alert':
        return `${colors.alert}`
      case 'bad':
        return `${colors.danger}`
      default:
        return ''
    }
  }}
`

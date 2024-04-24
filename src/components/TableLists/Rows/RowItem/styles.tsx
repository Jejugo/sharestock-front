import styled from 'styled-components'
import { IRowStyle, IRowItemStyle, IRowItemPlusStyle } from './interfaces'
import { colors } from '@styles/constants'

export const Row = styled.div<IRowStyle>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: grey;
    cursor: pointer;
    z-index: 1;
  }
`

export const RowItem = styled.div<IRowItemStyle>`
  flex-basis: 20%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  background-color: ${(props) => {
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
  }};
`

export const RowItemPlus = styled.div<IRowItemPlusStyle>`
  position: absolute;
  left: 0;
  padding: 0px 15px;
`

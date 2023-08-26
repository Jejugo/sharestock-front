import styled from 'styled-components'
import { IRowHeaderStyle } from './RowItem/interfaces'
import { colors } from '@styles/constants'

export const RowHeader = styled.div<IRowHeaderStyle>`
  flex-basis: 20%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.fixTableHeader &&
    `
    width: inheit;
    position: sticky;
    top: 0;
    background-color: grey;
    opacity: 0.8;
    z-index: 2;
  `}
`

export const FirstRow = styled.div`
  flex-basis: 20%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  cursor: pointer;
  background-color: ${colors.grey};

  &:hover {
    background-color: ${colors.lightGrey};
  }
`

import { spacings } from '@styles/constants'
import styled from 'styled-components'

export const StrategyFormBtn = styled.button`
  width: 10%;
  padding: 10px 0px;
  background-color: #ffcd00;
  cursor: pointer;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: grey;
    color: white;
    transition: 0.2s ease;
  }
`

export const StrategyFormBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 50px;
  margin: ${spacings.xxlarge}px 0;
`

export const StrategyFormHeaderButton = styled.div`
  height: 50px;
`

export const StrategyFormTotalPoints = styled.p`
  font-size: 26px;
`

export const StrategyFormList = styled.ul`
  list-style: none;
  padding: 0;
`

export const StrategyFormHeaderIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

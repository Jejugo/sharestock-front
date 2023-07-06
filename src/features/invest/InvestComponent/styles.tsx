import styled from 'styled-components'
import { fonts } from 'styles/constants'

export const InvestTitle = styled.h1`
  font-size: ${fonts.xlarge}px;
  font-family: 'Amatic SC', cursive;
  margin: 30px 0px;
`

export const InvestComponentLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
`

export const StockListAdd = styled.div`
  height: auto;
`

export const StockListQuantityInput = styled.input`
  display: block;
  padding: 10px;
  margin: 10px 0;
  min-width: 200px;
  border: none;
  font-family: 'Josefin Sans', sans-serif;
  border-radius: 2px;
  font-size: 16px;
`

export const DropdownStyle = styled.div`
  color: black;
  min-width: 200px;
  max-width: 270px;
`

export const InputWrapper = styled.div`
  width: 100%;
`

export const StockCheckBtnWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  position: sticky;
  bottom: 0;
`

export const ScoreView = styled.div`
  height: 40px;
  background-color: transparent;
  width: 100%;
  display: flex;
  margin: 50px 0px;
  position: sticky;
  top: 0;
  z-index: 0;
`

export const Points = styled.div`
  background-color: ${(props) => props.color};
  height: 100%;
  width: 100%;
  padding: 10px 0px;

  &:nth-child(1) {
    border-radius: 5px 0px 0px 5px;
  }

  &:nth-child(3) {
    border-radius: 0px 5px 5px 0px;
  }
`

export const PointsText = styled.p`
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  margin: 0;
`

import styled from 'styled-components'

export const StrategyFormTitle = styled.h1`
  font-size: 32px;
  font-family: 'Amatic SC', cursive;
`

export const StrategyFormSubTitle = styled.p`
font-family: 'Josefin Sans', sans-serif;
font-size: 20px;
`

export const StrategyForm = styled.form``

export const StrategyFormInput = styled.input`
  padding: 10px;
  margin-right: 5px;
  width: 500px;
  border-radius: 5px;
  border: none;
  font-family: 'Josefin Sans', sans-serif;
`

export const StockCheckListWeight = styled.p`
  position: absolute;
  left: 60%;
  color: orange;
  font-weight: 600;
`

export const StockCheckListInput = styled.input`
  position: absolute;
  left: 75%;
  color: orange;
  background-color: transparent;
  border-style: solid;
  border-color: orange;
  border-radius: 5px;
  outline: none;
  padding: 10px;
  text-align: center;
  font-family: 'Josefin Sans', sans-serif;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  & {
    -moz-appearance: textfield;
  }
`

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

export const StrategyFormList = styled.ul`
  list-style: none;
  padding: 0;
`

export const StrategyFormListItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
  background-color: #1e1e1e;
  padding: 2px 10px;
  border-radius: 5px;
  &:hover {
    background-color: grey;
  }

  cursor: pointer;
`

export const DeleteIconWrapper = styled.div`
  cursor: pointer;
`

export const StrategyFormBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const DropdownStyle = styled.div`
  color: black;
  margin: 10px 0px;
  width: 310px;
  border-radius: 5px;
  border: none;
`

export const StrategyFormHeaderIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const StrategyFormTotalPoints = styled.p`
  font-size: 26px;
`

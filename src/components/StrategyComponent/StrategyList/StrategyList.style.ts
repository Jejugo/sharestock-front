import styled from 'styled-components'

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

export const Statement = styled.div`
  width: 57%;
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

export const DeleteIconWrapper = styled.div`
  cursor: pointer;
`

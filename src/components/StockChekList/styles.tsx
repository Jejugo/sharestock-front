import styled from 'styled-components'

export const StockCheckList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

export const StockCheckListItem = styled.li`
  margin: 20px 0;
  background-color: #1e1e1e;
  padding: 2px 10px;
  border-radius: 5px;
  &:hover {
    background-color: grey;
  }

  cursor: pointer;
`

export const StockCheckListWeight = styled.p`
  position: absolute;
  left: 70%;
  color: orange;
  font-weight: 600;
`

export const CheckListItemWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

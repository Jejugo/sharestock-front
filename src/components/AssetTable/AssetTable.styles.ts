import TableRow from '@mui/material/TableRow'
import TableContainer from '@mui/material/TableContainer'
import styled from 'styled-components'
import { MouseEventHandler } from 'react'

export const TableContainerStyle = styled(TableContainer)`
  max-height: 70vh;
`

export const TableRowStyle = styled(TableRow)`
  position: relative;
  &:hover {
    background-color: #eee;

    p,
    span,
    a,
    h1,
    h2,
    h3,
    h4,
    h5,
    td {
      color: black;
      font-weight: 600;
    }
  }
`

interface IMenuItem {
  onClick: React.Dispatch<React.SetStateAction<boolean>>
}

export const MenuItem = styled.div<IMenuItem>`
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 30%;
`

export const MenuContent = styled.div`
  height: auto;
  width: auto;
  background-color: white;
  position: absolute;
  right: 10px;
  top: 50px;
  z-index: 999;
`

export const MenuContentList = styled.ul`
  list-style: none;
  padding: 0px;
  margin: 0px;
`

export const MenuContentListItem = styled.li`
  border: 1px solid #ccc;
  padding: 3px 30px;
  width: 100%:
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }
`

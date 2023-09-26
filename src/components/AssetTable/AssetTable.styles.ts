import TableRow from '@mui/material/TableRow'
import TableContainer from '@mui/material/TableContainer'
import styled from 'styled-components'

export const TableContainerStyle = styled(TableContainer)`
  max-height: 70vh;
`

export const TableRowStyle = styled(TableRow)`
  position: relative;
  &:hover {
    background-color: #333;

    p,
    span,
    a,
    h1,
    h2,
    h3,
    h4,
    h5,
    td {
      color: white;
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
  color: white;

  &:hover {
    color: black;
  }
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
  width: 100%;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }
`

export interface UpdateIcon {
  clickable?: boolean
  name?: string
  onClick?: (e: React.MouseEvent<HTMLLIElement>) => void | Promise<void>
}

export const UpdateIcon = styled.div<UpdateIcon>`
  margin-right: 50px;
  font-size: 25px;
  color: white;
  ${(props) => props.clickable && 'cursor: pointer;'}

  .MuiSvgIcon-root {
    font-size: 1.2em;
  }

  .MuiSvgIcon-root:hover {
    transition: ease 0.5s;
    color: orange;
    font-size: 1.6em;
  }
`

export const TableFilter = styled.section``

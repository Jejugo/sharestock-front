import React, { useCallback } from 'react'
import useAssetTableData from 'hooks/useAssetTableData'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'

import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

import NorthIcon from '@mui/icons-material/North'
import SouthIcon from '@mui/icons-material/South'
import { ITableColumn, ITableRow } from './interfaces'
import { isValueGood, isCheapStock } from './utils/helpers'

import Text from 'components/Text/Text'

import * as S from './AssetTable.styles'
import useOutsideClick from './hooks/useOutsideClick'
import axios from 'axios'
import config from 'configs'

export const AssetTable = React.memo(() => {
  const menuContentRef = React.useRef<HTMLDivElement | null>(null)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(50)
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null) // Set this to the row's unique identifier
  const [balancedAssets, setBalancedAssets] = React.useState<number>(0)
  const { rows, columns } = useAssetTableData()

  useOutsideClick(menuContentRef, () => {
    setSelectedRow(null) // close the menu when a click outside is detected
  })

  const handleChangePage = useCallback(
    (
      _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
      newPage: number
    ) => {
      setPage(newPage)
    },
    []
  )

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10))
      setPage(0)
    },
    []
  )

  const handleDeleteItem = async (e: any, row: any) => {
    try {
      const result = window.confirm(
        'Are you sure you want to delete this item?'
      )
      if (result) {
        e.preventDefault()

        const data = await axios.delete(
          `${config.SHARE_API}/bonds/${row.symbol}`
        )
        console.log('data: ', data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const balancedRows = rows.reduce((acc, curr) => {
    if (curr.isBalanced) {
      return acc + 1
    }
    return acc
  }, 0)

  return (
    <Paper
      sx={{ width: '100%', overflow: 'hidden', backgroundColor: '#151515' }}
    >
      <Text color="white">
        Você possui {rows.length} ativos.{' '}
        <Text color="lightGreen">{balancedRows} deles estão balanceados!</Text>
      </Text>
      <Text color="white">
        Valor Total: {` `}
        <Text color="yellow" style={{ display: 'inline' }}>
          R${rows.reduce((acc, curr) => acc + curr.currentValue, 0).toFixed(2)}
        </Text>
      </Text>
      <S.TableContainerStyle>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column: ITableColumn) => (
                <TableCell
                  sx={{ backgroundColor: '#3E3E3E', color: 'white' }}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: ITableRow, index: number) => {
                return (
                  <S.TableRowStyle role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column: ITableColumn) => {
                      // @ts-ignore
                      const value = row[column.id]
                      const recommendedPercentage = row.recommended
                      const totalPercentage = row.total

                      const recommendedValue = row['recommendedValue']
                      const currentValue = row['currentValue']

                      let cellColor
                      if (column.id === 'currentValue') {
                        const goodValue = isValueGood(
                          currentValue,
                          recommendedValue
                        )

                        if (goodValue) {
                          cellColor = 'green'
                        } else cellColor = 'red'
                      } else cellColor = 'white'

                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{
                            backgroundColor: isCheapStock(row),
                            color:
                              column.id === 'currentValue'
                                ? row.isBalanced
                                  ? 'green'
                                  : 'red'
                                : 'white'
                          }}
                        >
                          {column.format && typeof value === 'number' ? (
                            column.format(value)
                          ) : column.id === 'adjustment' ? (
                            <span>
                              {recommendedPercentage > totalPercentage ? (
                                <>
                                  <NorthIcon
                                    style={{
                                      fontSize: 'medium',
                                      color: 'green'
                                    }}
                                  />
                                  {value}
                                </>
                              ) : (
                                <>
                                  <SouthIcon
                                    style={{ fontSize: 'medium', color: 'red' }}
                                  />
                                  {value}
                                </>
                              )}
                            </span>
                          ) : (
                            value
                          )}
                        </TableCell>
                      )
                    })}
                    <S.MenuItem
                      onClick={() =>
                        setSelectedRow(selectedRow === index ? null : index)
                      }
                    >
                      &#xFE19;
                    </S.MenuItem>
                    {selectedRow === index && (
                      <S.MenuContent>
                        <S.MenuContentList>
                          <S.MenuContentListItem>Edit</S.MenuContentListItem>
                          <S.MenuContentListItem
                            onClick={(e) => handleDeleteItem(e, row)}
                          >
                            Delete
                          </S.MenuContentListItem>
                        </S.MenuContentList>
                      </S.MenuContent>
                    )}
                  </S.TableRowStyle>
                )
              })}
          </TableBody>
        </Table>
      </S.TableContainerStyle>
      <TablePagination
        sx={{ backgroundColor: '#1E1E1E', color: 'white' }}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
})

export default AssetTable
AssetTable.displayName = 'AssetTable'

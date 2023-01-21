import React, { useCallback } from 'react'
import useAssetTableData from 'hooks/useAssetTableData'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

import NorthIcon from '@mui/icons-material/North'
import SouthIcon from '@mui/icons-material/South'
import { ITableColumn, ITableRow } from './interfaces'
import { isValueGood, isCheapStock } from './utils/helpers'

export const AssetTable = React.memo(() => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(25)
  const { rows, columns } = useAssetTableData()

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

  return (
    <Paper
      sx={{ width: '100%', overflow: 'hidden', backgroundColor: '#151515' }}
    >
      <span style={{ color: 'white' }}>
        Você possui {rows.length} ações em carteira
      </span>
      <TableContainer sx={{ maxHeight: '70vh' }}>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column: ITableColumn) => {
                      // @ts-ignore
                      const value = row[column.id]
                      const recommendedPercentage = parseFloat(
                        row['recommended'].split('%')[0]
                      )
                      const totalPercentage = parseFloat(
                        row['total'].split('%')[0]
                      )

                      const recommendedValue = row['recommendedValue']
                      const currentValue = row['currentValue']
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{
                            backgroundColor: isCheapStock(row),
                            color:
                              column.id === 'currentValue' &&
                              isValueGood(currentValue, recommendedValue)
                                ? 'green'
                                : column.id === 'currentValue' &&
                                  !isValueGood(currentValue, recommendedValue)
                                ? 'red'
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
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
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

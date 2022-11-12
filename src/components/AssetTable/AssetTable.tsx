import React from 'react'

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

interface IRowColors {
  [key: number]: string
}

const rowColors: IRowColors = {
  0: 'rgba(237, 34, 38, 0.4)',
  1: 'rgba(227, 66, 98, 0.4)',
  2: 'rgba(255, 204, 92, 0.4)',
  3: 'rgba(150, 206, 180, 0.4)',
  4: 'rgba(5, 255, 161, 0.4)'
}

interface IAssetTable {
  rows: ITableRow[]
  columns: ITableColumn[]
  page: number
  rowsPerPage: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
}

export default function AssetTable({
  rows,
  columns,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage
}: IAssetTable) {
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value))
    setPage(0)
  }

  const isValueGood = (currentValue: number, recommendedValue: number) =>
    recommendedValue >= currentValue
      ? recommendedValue - currentValue <= 1000
      : recommendedValue - currentValue >= -1000

  const isCheapStock = (row: ITableRow): string =>
    rowColors[row.cheapStockScore]

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: 'black' }}>
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
}

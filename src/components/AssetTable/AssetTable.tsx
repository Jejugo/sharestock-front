import React, { useCallback } from 'react'
import useAssetTableData from '@hooks/useAssetTableData'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'

import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

import CachedIcon from '@material-ui/icons/Cached'
import { ITableColumn, ITableRow } from './interfaces'
import { useUserDataContext } from '@context/UserDataContext'

import Text from '@components/Text/Text'

import * as S from './AssetTable.styles'
import useOutsideClick from './hooks/useOutsideClick'
import { useAuth } from '@context/AuthUserContext'
import Loading from '@components/Loading/Loading'
import Flex from '@components/container/Flex/Flex'
import { Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { getTextColor, isCheapStock } from './utils/helpers'
import NorthIcon from '@mui/icons-material/North'
import SouthIcon from '@mui/icons-material/South'
import assetTypes from '@const/AssetTypes'
import Router from 'next/router'

const getContent = (
  column: ITableColumn,
  value: any,
  recommendedPercentage: number,
  totalPercentage: number,
  showMoneyInvested: boolean
): React.ReactNode => {
  if (column.id === 'currentValue' && !showMoneyInvested) return '-'

  if (column.format && typeof value === 'number') {
    return column.format(value)
  }

  switch (column.id) {
    case 'cheapStockScore':
      return <>{isCheapStock(value)}</>
    case 'adjustment': {
      const adjustmentIcon =
        recommendedPercentage > totalPercentage ? (
          <NorthIcon style={{ fontSize: 'medium', color: 'green' }} />
        ) : (
          <SouthIcon style={{ fontSize: 'medium', color: 'red' }} />
        )
      return (
        <>
          {adjustmentIcon}
          {value}
        </>
      )
    }
    case 'type':
      return assetTypes[value].title
    case 'symbol':
      return value.toUpperCase()
    default:
      return value
  }
}

const renderRow = (
  row: ITableRow,
  column: ITableColumn,
  showMoneyInvested: boolean
) => {
  const value = row[column?.id as keyof ITableRow]
  const recommendedPercentage = row.recommended
  const totalPercentage = row.total
  const textColor = getTextColor(column, row)
  const content = getContent(
    column,
    value,
    recommendedPercentage,
    totalPercentage,
    showMoneyInvested
  )

  return (
    <TableCell key={column.id} align={column.align} sx={{ color: textColor }}>
      {content}
    </TableCell>
  )
}

export const AssetTable = React.memo(() => {
  const { authUser } = useAuth()
  const menuContentRef = React.useRef<HTMLDivElement | null>(null)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(50)
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null) // Set this to the row's unique identifier
  const { userData } = useUserDataContext()

  const { allRows, columns, refreshData, isLoading } = useAssetTableData()

  const [assetTypeFilter, setAssetTypeFilter] = React.useState<string>('all')

  useOutsideClick(menuContentRef, () => {
    setSelectedRow(null)
  })

  const goToAssetStrategy = (row: ITableRow) => {
    if (row.type === 'stocks' || row.type === 'reits') {
      Router.push(`/invest/${row.type}/${row.symbol.toUpperCase()}`)
    }
  }

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
        e.stopPropagation()

        await fetch(
          `${process.env.NEXT_PUBLIC_SHARE_API}/assets/${row.type}/${row.symbol}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${authUser.accessToken}`
            }
          }
        )

        refreshData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const balancedRows = allRows.reduce((acc, curr) => {
    if (curr.isBalanced) {
      return acc + 1
    }
    return acc
  }, 0)

  const onSync = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_SHARE_API}/sync/user/${authUser.uid}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authUser.accessToken}`
        }
      }
    )
    refreshData()
  }

  const filteredAssets = allRows.filter((row: ITableRow) =>
    assetTypeFilter === 'all' ? true : row.type === assetTypeFilter
  )

  const totalInvested = filteredAssets.reduce((acc, curr) => {
    return acc + curr.currentValue
  }, 0)

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Paper sx={S.PaperWrapperStyles}>
          <Paper sx={S.PaperContentStyles}>
            <Flex justifyContent="space-between" alignItems="center">
              <Text color="white">Você possui {allRows.length} ativos. </Text>
              <S.UpdateIcon clickable onClick={onSync}>
                <CachedIcon />
              </S.UpdateIcon>
            </Flex>

            <Text color="lightGreen">
              {balancedRows} deles estão balanceados!
            </Text>

            <Flex justifyContent="space-between">
              <Select
                value={assetTypeFilter}
                onChange={(e: SelectChangeEvent<string>) =>
                  setAssetTypeFilter(e.target.value)
                }
                variant="outlined"
                sx={{
                  backgroundColor: 'white',
                  margin: '10px 0',
                  width: 200
                }}
              >
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="reits">Fundos Imobiliários</MenuItem>
                <MenuItem value="stocks">Ações</MenuItem>
                <MenuItem value="bonds">Renda Fixa</MenuItem>
                <MenuItem value="international">Internacional</MenuItem>
                <MenuItem value="crypto">Crypto</MenuItem>
              </Select>
              {userData.showMoneyInvested && (
                <Text color="lightGreen">
                  {assetTypeFilter === 'all'
                    ? `Ao todo, você possui R$${totalInvested.toFixed(2)}`
                    : `Você possui R$${totalInvested.toFixed(
                        2
                      )} em ${assetTypeFilter}`}
                </Text>
              )}
            </Flex>

            <S.TableContainerStyle>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column: ITableColumn) => (
                      <TableCell
                        sx={{ backgroundColor: '#222', color: 'white' }}
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
                  {filteredAssets
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: ITableRow, index: number) => {
                      const isHighlighted =
                        !row.isBalanced && row.recommended > row.total

                      return (
                        <S.TableRowStyle
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                          isHighlighted={isHighlighted}
                          onClick={() => goToAssetStrategy(row)}
                        >
                          {columns.map((column: ITableColumn) =>
                            renderRow(row, column, userData.showMoneyInvested)
                          )}
                          <S.MenuItem
                            onClick={(e: any) => {
                              e.stopPropagation()
                              setSelectedRow((prevState) => {
                                return prevState === index ? null : index
                              })
                            }}
                          >
                            &#xFE19;
                          </S.MenuItem>
                          {selectedRow === index && (
                            <S.MenuContent ref={menuContentRef}>
                              <S.MenuContentList>
                                <S.MenuContentListItem
                                  onClick={() => goToAssetStrategy(row)}
                                >
                                  Open
                                </S.MenuContentListItem>
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
              count={allRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Paper>
      )}
    </>
  )
})

export default AssetTable
AssetTable.displayName = 'AssetTable'

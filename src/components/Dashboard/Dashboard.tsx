import React from 'react'
import PieChartComponent from '../charts/PieChart/PieChart'
import TableComponent from '../AssetTable/AssetTable'
import * as S from './styles'

import useAssetTableData from 'hooks/useAssetTableData'
import Title from '@components/Title/Title'

interface IArrayToObject<T> {
  [key: string]: T
}
interface IDashboardComponent {
  sharesMap: IArrayToObject<IStockItem>
  sharesList: IStockItem[]
}

export default function DashboardComponent({
  sharesMap,
  sharesList
}: IDashboardComponent) {
  const { rows, columns } = useAssetTableData()

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10)
  const totalValue = parseFloat(
    rows.reduce((acc, row) => acc + row.currentValue, 0).toFixed(2)
  )

  return (
    <S.DashboardComponentWrapper>
      <Title text="Olá, Jeff"></Title>
      <S.DashboardWrapper>
        <S.PieChartWrapper>
          <PieChartComponent
            totalValue={totalValue}
            rows={rows}
            sharesMap={sharesMap}
            sharesList={sharesList}
          />
        </S.PieChartWrapper>
        {/* <S.PieChartWrapper>
          <PieChartComponent totalValue={totalValue} rows={rows} sharesMap={sharesMap} sharesList={sharesList}/>
        </S.PieChartWrapper> */}
      </S.DashboardWrapper>
      <S.WalletAssets>
        <TableComponent
          rows={rows}
          columns={columns}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
        ></TableComponent>
      </S.WalletAssets>
    </S.DashboardComponentWrapper>
  )
}

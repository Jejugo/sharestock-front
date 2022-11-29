import React from 'react'
import PieChartComponent from 'components/charts/PieChart/PieChart'
import TableComponent from 'components/AssetTable/AssetTable'

import { Tooltip } from 'recharts'
import CustomTooltip from 'components/charts/PieChart/CustomTooltip/CustomTooltip'
import * as S from './styles'

import useAssetTableData from 'hooks/useAssetTableData'
import Title from 'components/Title/Title'

import useRowsData from './hooks/useRowsData'

interface IArrayToObject<T> {
  [key: string]: T
}
interface IDashboardComponent {
  sharesMap: IArrayToObject<IStockItem>
}

export default function DashboardComponent({ sharesMap }: IDashboardComponent) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10)
  const { rows, columns } = useAssetTableData()
  const { assetSectors, pieChartData } = useRowsData({ sharesMap })

  return (
    <S.DashboardComponentWrapper>
      <Title text="Olá, Jeff" />
      <S.DashboardWrapper>
        <S.PieChartWrapper>
          <PieChartComponent
            data={pieChartData}
            size={{ width: 850, height: 500 }}
          >
            <Tooltip
              isAnimationActive={true}
              animationDuration={2}
              animationEasing="ease"
              formatter={(data: string) =>
                `${(parseInt(data) * 100).toString()}%`
              }
              // @ts-ignore
              content={<CustomTooltip assetSectors={assetSectors} />}
            />
          </PieChartComponent>
        </S.PieChartWrapper>
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

import React from 'react'
import PieChartComponent from '../charts/PieChart/PieChart'
import TableComponent from '../AssetTable/AssetTable'
import { IStockSector } from './interfaces'
import { Tooltip } from 'recharts'
import * as S from './styles'

import useAssetTableData from 'hooks/useAssetTableData'
import Title from '@components/Title/Title'
import { Payload } from 'recharts/types/component/DefaultTooltipContent'
import useRowsData from './hooks/useRowsData'

function CustomTooltip({
  payload,
  assetSectors
}: {
  payload: Payload<number, string>[]
  assetSectors: IStockSector[]
}) {
  return (
    <S.ToolTip>
      <S.TooltipTitle>
        {`${((payload[0]?.value ?? 0) * 100).toFixed(2)}%`}
      </S.TooltipTitle>
      <S.TooltipList>
        {payload[0]?.name
          ? assetSectors?.map((sector: IStockSector, index: number) => {
              if (sector.sector === payload[0]?.name) {
                return <li key={index}>{sector.name}</li>
              }
              return null
            })
          : null}
      </S.TooltipList>
    </S.ToolTip>
  )
}
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

  const handleFormatter = (data: any) => {
    return `${(data * 100).toString()}%`
  }

  return (
    <S.DashboardComponentWrapper>
      <Title text="Olá, Jeff"></Title>
      <S.DashboardWrapper>
        <S.PieChartWrapper>
          <PieChartComponent data={pieChartData}>
            <Tooltip
              isAnimationActive={true}
              animationDuration={2}
              animationEasing="ease"
              formatter={handleFormatter}
              // @ts-ignore
              content={<CustomTooltip assetSectors={assetSectors} />}
            />
          </PieChartComponent>
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

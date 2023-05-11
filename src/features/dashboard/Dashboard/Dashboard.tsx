import React from 'react'
import PieChartComponent from 'components/charts/PieChart/PieChart'
import TableComponent from 'components/AssetTable/AssetTable'

import { Tooltip } from 'recharts'

import CustomTooltip from 'components/charts/PieChart/CustomTooltip/CustomTooltip'
import * as S from './styles'

import Title from 'components/Title/Title'

import useRowsData from './hooks/useRowsData'
import useGoalsdata from './hooks/useGoalsdata'

interface IArrayToObject<T> {
  [key: string]: T
}
interface IDashboardComponent {
  sharesMap: IArrayToObject<IStockItem>
}

export default function DashboardComponent({ sharesMap }: IDashboardComponent) {
  const { assetSectors, pieChartData } = useRowsData({ sharesMap })

  const { stocks } = useGoalsdata()

  return (
    <S.DashboardComponentWrapper>
      <Title text="Olá, Jeff" />
      <S.DashboardWrapper>
        <PieChartComponent
          data={pieChartData}
          size={{ width: 800, height: 300 }}
        >
          <Tooltip
            isAnimationActive={true}
            animationDuration={2}
            animationEasing="ease"
            formatter={(data: string) =>
              `${(parseInt(data) * 100).toString()}%`
            }
            // @ts-ignore
            content={<CustomTooltip assetSectors={assetSectors} decimals={2} />}
          />
        </PieChartComponent>
        {stocks?.length > 0 ? (
          <PieChartComponent data={stocks} size={{ width: 800, height: 300 }}>
            <Tooltip
              isAnimationActive={true}
              animationDuration={2}
              animationEasing="ease"
              content={
                // @ts-ignore
                <CustomTooltip assetSectors={assetSectors} decimals={0} />
              }
            />
          </PieChartComponent>
        ) : null}
      </S.DashboardWrapper>
      <S.WalletAssets>
        <TableComponent />
      </S.WalletAssets>
    </S.DashboardComponentWrapper>
  )
}

import React, { useEffect, useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { ITableRow } from '@components/AssetTable/interfaces'
import { IStockSector } from './interfaces'
import { Payload } from 'recharts/types/component/DefaultTooltipContent'

import * as S from './styles'
import { sortArrayAlphabetically } from '@builders/arrays'

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#9999ff',
  '#d6aa7f',
  '#a45a52',
  '#36c90e',
  '#cc3333',
  '#fbbaf7',
  '#82a8f4'
]

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
          ? assetSectors?.map((sector: IStockSector) => {
              if (sector.sector === payload[0]?.name) {
                return <li>{sector.name}</li>
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
interface IPieChart {
  totalValue: number
  rows: ITableRow[]
  sharesMap: IArrayToObject<IStockItem>
  sharesList: IStockItem[]
}

const PieChartComponent = ({
  totalValue,
  rows,
  sharesMap,
  sharesList
}: IPieChart) => {
  const [data, setData] = useState<{ name: string; value: number }[]>([])
  const [sectors, setSectors] = useState<string[]>([])
  const [assetSectors, setAssetSectors] = useState<
    { name: string; sector: string; value: number }[]
  >([])

  const handleFormatter = (data: any) => {
    return `${(data * 100).toString()}%`
  }

  const handlePieClick = (data: any) => {
    console.log('clicked', data)
  }

  const handleLabel = (entry: any) => entry.name

  useEffect(() => {
    if (sharesMap && totalValue > 0) {
      const stockSectors = [
        ...new Set(
          sharesList.map((shares: IStockItem) => shares['segmento_bovespa'])
        )
      ]
      setSectors(stockSectors)
      const currentWalletSectors: IStockSector[] = rows.map((row) => {
        const sector = sharesMap[row.symbol].segmento_bovespa
        return {
          name: row.symbol,
          sector,
          value: row.currentValue
        }
      })
      setAssetSectors(currentWalletSectors)

      const totalValueBySector = currentWalletSectors.reduce(
        (
          acc: { [key: string]: number },
          wallet: { name: string; sector: string; value: number }
        ) => ({
          ...acc,
          [wallet.sector]: parseFloat(
            (acc[wallet.sector] + wallet.value).toFixed(3)
          )
        }),
        currentWalletSectors.reduce(
          (
            acc: { [key: string]: number },
            curr: { name: string; sector: string; value: number }
          ) => ({
            ...acc,
            [curr.sector]: 0
          }),
          {}
        )
      )

      const finalData = sortArrayAlphabetically(
        Object.keys(totalValueBySector).map((key: string) => ({
          name: key,
          value: parseFloat((totalValueBySector[key] / totalValue).toFixed(4))
        })),
        'name'
      )

      setData(finalData)
    }
  }, [sharesMap, totalValue])

  return (
    <>
      {data.length ? (
        <ResponsiveContainer width={1200} height={500}>
          <PieChart width={600} height={600}>
            <Pie
              onClick={handlePieClick}
              dataKey="value"
              isAnimationActive={true}
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label={handleLabel}
              style={{ fontWeight: '600' }}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              isAnimationActive={true}
              animationDuration={2}
              animationEasing="ease"
              formatter={handleFormatter}
              // @ts-ignore
              content={<CustomTooltip assetSectors={assetSectors} />}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : null}
    </>
  )
}

export default PieChartComponent

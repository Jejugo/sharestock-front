import { useState, useEffect, useMemo } from 'react'
import { IChartData } from '@components/charts/BarChart/interfaces'
import useAssetTableData from '@hooks/useAssetTableData'
import useGoalsdata from './useGoalsdata'
import { ITableRow } from '@components/AssetTable/interfaces'
import { sortArrayAlphabetically } from '@builders/arrays'
import assetTypes from '@const/AssetTypes'

const calculateTotalByAssetType = (arr: ITableRow[]) =>
  arr.reduce((acc: any, item: ITableRow) => {
    const assetType = item.type
    const value = item.currentValue

    if (acc[assetType]) {
      acc[assetType] = Number((acc[assetType] + value).toFixed(2))
    } else {
      acc[assetType] = Number(value.toFixed(2))
    }

    return acc
  }, {})

export default function useBarChartData() {
  const { allRows } = useAssetTableData()
  const [currentChartData, setCurrentChartData] = useState<IChartData[]>([])
  const [goalsChartData, setGoalsChartData] = useState<IChartData[]>([])
  const [totalValue, setTotalValue] = useState(0)
  const goals = useGoalsdata()

  useEffect(() => {
    if (allRows?.length && goals?.overview?.length) {
      const totalValues = calculateTotalByAssetType(allRows)

      const chartData = sortArrayAlphabetically(
        Object.keys(totalValues).map((totalKey: string) => ({
          name: assetTypes[totalKey].title,
          value: totalValues[totalKey],
          percentage: parseFloat(
            ((totalValues[totalKey] / totalValue) * 10 ** 2).toFixed(2)
          )
        })),
        'name'
      )

      setCurrentChartData(chartData)
      setTotalValue(chartData.reduce((acc, curr) => acc + curr.value, 0))
      setGoalsChartData(
        goals.overview.map((overviewItem: { name: string; value: number }) => ({
          name: overviewItem.name,
          value: overviewItem.value || 0
        }))
      )
    }
  }, [allRows, goals.overview])

  const isLoading = useMemo(
    () => currentChartData === null || goalsChartData === null,
    [currentChartData, goalsChartData]
  )

  return {
    currentChartData,
    goalsChartData,
    totalValue,
    isLoading
  }
}

import { IBarData } from 'components/charts/BarChart/interfaces'
import React, { useState, useEffect } from 'react'
import useAssetTableData from 'hooks/useAssetTableData'
import useGoalsdata from '../hooks/useGoalsdata'
import { ITableRow } from 'components/AssetTable/interfaces'
import { sortArrayAlphabetically } from 'builders/arrays'
import assetTypes from 'const/AssetTypes'

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

export default function useBarChartData(totalValue: number) {
  const { allRows } = useAssetTableData()
  const [currentChartData, setCurrentChartData] = useState<IBarData[]>([])
  const [goalsChartData, setGoalsChartData] = useState<IBarData[]>([])
  const { overview } = useGoalsdata()

  useEffect(() => {
    if (allRows?.length && overview?.length) {
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
      setGoalsChartData(
        overview.map((overviewItem: { name: string; value: number }) => ({
          name: overviewItem.name,
          value: overviewItem.value || 0
        }))
      )
    }
  }, [allRows, overview])

  return {
    currentChartData,
    goalsChartData
  }
}

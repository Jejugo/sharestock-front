import { IBarData } from 'components/charts/BarChart/interfaces'
import React, { useState, useEffect } from 'react'
import useAssetTableData from 'hooks/useAssetTableData'
import useGoalsdata from '../hooks/useGoalsdata'

interface IArrayToObject<T> {
  [key: string]: T
}

export default function useBarChartData() {
  const { rows } = useAssetTableData()
  const [currentChartData, setCurrentChartData] = useState<IBarData[]>([])
  const [goalsChartData, setGoalsChartData] = useState<IBarData[]>([])
  const { overview } = useGoalsdata()

  useEffect(() => {
    if (rows.length && overview.length) {
      const stockRowsTotalValue = Number(
        rows
          .filter((item) => item.type === 'stocks')
          .reduce((acc, curr) => curr.currentValue + acc, 0)
          .toFixed(2)
      )
      const reitRowsTotalValue = Number(
        rows
          .filter((item) => item.type === 'reits')
          .reduce((acc, curr) => curr.currentValue + acc, 0)
          .toFixed(2)
      )
      const bondRowsTotalValue = Number(
        rows
          .filter((item) => item.type === 'bonds')
          .reduce((acc, curr) => curr.currentValue + acc, 0)
          .toFixed(2)
      )
      const internationalRowsTotalValue = Number(
        rows
          .filter((item) => item.type === 'international')
          .reduce((acc, curr) => curr.currentValue + acc, 0)
          .toFixed(2)
      )

      const totalValue =
        stockRowsTotalValue +
        reitRowsTotalValue +
        bondRowsTotalValue +
        internationalRowsTotalValue

      setCurrentChartData([
        {
          name: 'Shares',
          value: stockRowsTotalValue,
          percentage: parseFloat(
            ((stockRowsTotalValue / totalValue) * 10 ** 2).toFixed(2)
          )
        },
        {
          name: 'Reits',
          value: reitRowsTotalValue,
          percentage: parseFloat(
            ((reitRowsTotalValue / totalValue) * 10 ** 2).toFixed(2)
          )
        },
        {
          name: 'Bonds',
          value: bondRowsTotalValue,
          percentage: parseFloat(
            ((bondRowsTotalValue / totalValue) * 10 ** 2).toFixed(2)
          )
        },
        {
          name: 'International Assets',
          value: internationalRowsTotalValue,
          percentage: parseFloat(
            ((internationalRowsTotalValue / totalValue) * 10 ** 2).toFixed(2)
          )
        }
      ])
      setGoalsChartData([
        {
          name: 'Shares',
          value: overview.find((item) => item.name === 'ações')?.value || 0,
          percentage: overview.find((item) => item.name === 'ações')?.value || 0
        },
        {
          name: 'Reits',
          value:
            overview.find((item) => item.name === 'fundos imobiliarios')
              ?.value || 0,
          percentage:
            overview.find((item) => item.name === 'fundos imobiliarios')
              ?.value || 0
        },
        {
          name: 'Bonds',
          value:
            overview.find((item) => item.name === 'renda fixa')?.value || 0,
          percentage:
            overview.find((item) => item.name === 'renda fixa')?.value || 0
        },
        {
          name: 'International Assets',
          value:
            overview.find((item) => item.name === 'internacional')?.value || 0,
          percentage:
            overview.find((item) => item.name === 'internacional')?.value || 0
        }
      ])
    }
  }, [rows, overview])

  return {
    currentChartData,
    goalsChartData
  }
}

import { sortArrayAlphabetically } from 'builders/arrays'
import {
  getTotalValueBySector,
  walletStockSectors,
  walletReitSectors
} from 'builders/assets'
import useAssetTableData from 'hooks/useAssetTableData'
import { useEffect, useState } from 'react'
import { IPieData, IStockSector } from '../interfaces'
import { ISliderMap } from '../Dashboard'
import useGoalsdata from '../hooks/useGoalsdata'

interface IArrayToObject<T> {
  [key: string]: T
}

interface IUseRowsData {
  sharesMap: IArrayToObject<IStockItem>
  reitsMap: IArrayToObject<IReitItem>
  bondsMap: IArrayToObject<{
    value: number
  }>
  internationalAssetsMap: IArrayToObject<{
    value: number
  }>
  setSliderMap: React.Dispatch<React.SetStateAction<ISliderMap[]>>
}

export default function usePieChartData({
  sharesMap,
  reitsMap,
  bondsMap,
  internationalAssetsMap,
  setSliderMap
}: IUseRowsData) {
  const { rows } = useAssetTableData()
  const {
    stocks: stockGoals,
    reits: reitGoals,
    bonds: bondGoals,
    international: internationalGoals
  } = useGoalsdata()
  const stockRows = rows.filter((item) => item.type === 'stocks')
  const reitRows = rows.filter((item) => item.type === 'reits')
  const bondRows = rows.filter((item) => item.type === 'bonds')
  const internationalRows = rows.filter((item) => item.type === 'international')

  const [stockSectors, setStockSectors] = useState<
    { name: string; sector: string; value: number }[]
  >([])

  const [reitsSectors, setReitsSectors] = useState<
    { name: string; sector: string; value: number }[]
  >([])

  const [bondsSectors, setBondsSectors] = useState<any>([])

  const [internationalSectors, setInternationalSectors] = useState<any>([])

  const [stockPieChartData, setStockPieChartData] = useState<IPieData[]>([
    {
      name: '',
      value: 0
    }
  ])

  const [reitPieChartData, setReitPieChartData] = useState<IPieData[]>([
    {
      name: '',
      value: 0
    }
  ])

  const [bondsPieData, setBondsPieData] = useState<IPieData[]>([
    {
      name: '',
      value: 0
    }
  ])

  const [internationalPieData, setInternationalPieData] = useState<IPieData[]>([
    {
      name: '',
      value: 0
    }
  ])

  const totalValue = parseFloat(
    stockRows.reduce((acc, row) => acc + row.currentValue, 0).toFixed(2)
  )
  useEffect(() => {
    if (sharesMap && totalValue > 0) {
      const currentWalletSectors: IStockSector[] = walletStockSectors(
        stockRows,
        sharesMap
      )
      setStockSectors(currentWalletSectors)

      const totalValueBySector = getTotalValueBySector(currentWalletSectors)

      const totalValuesList = Object.keys(totalValueBySector).map(
        (key: string) => ({
          name: key,
          value: parseFloat((totalValueBySector[key] / totalValue).toFixed(4))
        })
      )

      const finalData = sortArrayAlphabetically<IPieData>(
        totalValuesList,
        'name'
      )

      setStockPieChartData(finalData)
    }
  }, [sharesMap, totalValue])

  useEffect(() => {
    if (reitsMap && totalValue > 0) {
      const reitSectors = walletReitSectors(reitRows, reitsMap)
      setReitsSectors(reitSectors)

      const totalValueBySector = getTotalValueBySector(reitSectors)

      const totalValuesList = Object.keys(totalValueBySector).map(
        (key: string) => ({
          name: key,
          value: parseFloat((totalValueBySector[key] / totalValue).toFixed(4))
        })
      )

      const finalData = sortArrayAlphabetically<IPieData>(
        totalValuesList,
        'name'
      ).sort((a: any, b: any) => a.name.localeCompare(b.name))

      setReitPieChartData(finalData)
    }
  }, [reitsMap, totalValue])

  useEffect(() => {
    if (bondsMap && totalValue > 0) {
      const totalValue = bondRows.reduce(
        (acc, curr) => acc + curr.currentValue,
        0
      )
      const bondsSectors = bondRows.map((bond: any) => bond.asset)
      const pieChartData = bondRows
        .map((bond: any) => ({
          name: bond.asset,
          value: bond.currentValue,
          percentage: bond.currentValue / totalValue
        }))
        .sort((a: any, b: any) => a.name.localeCompare(b.name))

      setBondsSectors(bondsSectors)
      setBondsPieData(pieChartData)
    }
  }, [bondsMap, totalValue])

  useEffect(() => {
    if (internationalAssetsMap && totalValue > 0) {
      const totalValue = internationalRows.reduce(
        (acc, curr) => acc + curr.currentValue,
        0
      )
      const internationalSectors = internationalRows
        .map((international: any) => international.asset)
        .sort()

      const pieChartData = internationalRows
        .map((international: any) => ({
          name: international.asset,
          value: international.currentValue,
          percentage: international.currentValue / totalValue
        }))
        .sort((a: any, b: any) => a.name.localeCompare(b.name))

      setInternationalSectors(internationalSectors)
      setInternationalPieData(pieChartData)
    }
  }, [internationalAssetsMap, totalValue])

  useEffect(() => {
    if (
      stockGoals &&
      reitGoals &&
      bondGoals &&
      internationalGoals &&
      stockPieChartData &&
      reitPieChartData
    ) {
      setSliderMap([
        {
          title: 'Stocks',
          goals: stockGoals,
          data: stockPieChartData,
          sectors: stockSectors
        },
        {
          title: 'Reits',
          goals: reitGoals,
          data: reitPieChartData,
          sectors: reitsSectors
        },
        {
          title: 'Bonds',
          goals: bondGoals,
          data: bondsPieData,
          sectors: bondsSectors
        },
        {
          title: 'International',
          goals: internationalGoals,
          data: internationalPieData,
          sectors: internationalSectors
        }
      ])
    }
  }, [
    stockGoals,
    reitGoals,
    bondGoals,
    stockPieChartData,
    internationalGoals,
    reitPieChartData
  ])

  return {
    stockSectors,
    reitsSectors,
    stockPieChartData,
    reitPieChartData,
    bondsPieData
  }
}

import { sortArrayAlphabetically } from '@builders/arrays'
import {
  getTotalValueBySector,
  walletStockSectors,
  walletReitSectors
} from '@builders/assets'
import useAssetTableData from '@hooks/useAssetTableData'
import { useEffect, useState } from 'react'
import { IPieData, IStockSector } from '../interfaces'
import { ISliderMap } from '@features/dashboard/Dashboard/types'
import useGoalsdata from '../hooks/useGoalsdata'

interface IArrayToObject<T> {
  [key: string]: T
}

interface IUseRowsData {
  sharesMap: IArrayToObject<IStockItem>
  reitsMap: IArrayToObject<IReitItem>
  setSliderMap: React.Dispatch<React.SetStateAction<ISliderMap[]>>
}

export default function usePieChartData({
  sharesMap,
  reitsMap,
  setSliderMap
}: IUseRowsData) {
  const {
    stocks: stockRows,
    reits: reitRows,
    bonds: bondRows,
    international: internationalRows,
    crypto: cryptoRows
  } = useAssetTableData()
  const {
    stocks: stockGoals,
    reits: reitGoals,
    bonds: bondGoals,
    international: internationalGoals,
    crypto: cryptoGoals
  } = useGoalsdata()

  const [stockSectors, setStockSectors] = useState<
    { name: string; sector: string; value: number }[]
  >([])

  const [reitsSectors, setReitsSectors] = useState<
    { name: string; sector: string; value: number }[]
  >([])

  const [bondsSectors, setBondsSectors] = useState<any>([])

  const [internationalSectors, setInternationalSectors] = useState<any>([])

  const [cryptoSectors, setCryptoSectors] = useState<any>([])

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
  const [cryptoPieData, setCryptoPieData] = useState<IPieData[]>([
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
    if (totalValue > 0) {
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
  }, [totalValue])

  useEffect(() => {
    if (totalValue > 0) {
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
  }, [totalValue])

  useEffect(() => {
    if (totalValue > 0) {
      const totalValue = cryptoRows.reduce(
        (acc, curr) => acc + curr.currentValue,
        0
      )
      const cryptoSectors = cryptoRows.map((crypto: any) => crypto.asset).sort()

      const pieChartData = cryptoRows
        .map((crypto: any) => ({
          name: crypto.asset,
          value: crypto.currentValue,
          percentage: crypto.currentValue / totalValue
        }))
        .sort((a: any, b: any) => a.name.localeCompare(b.name))

      setCryptoSectors(cryptoSectors)
      setCryptoPieData(pieChartData)
    }
  }, [totalValue])

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
        },
        {
          title: 'Crypto',
          goals: cryptoGoals,
          data: cryptoPieData,
          sectors: cryptoSectors
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

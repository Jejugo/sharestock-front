import { sortArrayAlphabetically } from '@builders/arrays'
import {
  getTotalValueBySector,
  walletStockSectors,
  walletReitSectors
} from '@builders/assets'
import useAssetTableData from '@hooks/useAssetTableData'
import { useEffect, useState, useReducer, useCallback } from 'react'
import {
  IPieData,
  IStockSector
} from '../features/dashboard/Dashboard/interfaces'
import { ISliderMap } from '@features/dashboard/Dashboard/types'
import useGoalsdata from './useGoalsdata'
import { assetsSummaryReducer } from './reducers/assetsSummaryReducer'

interface IArrayToObject<T> {
  [key: string]: T
}

interface IUseRowsData {
  sharesMap: IArrayToObject<IStockItem>
  reitsMap: IArrayToObject<IReitItem>
}

export type AssetsSummary = {
  stockSectors?: IStockSector[]
  reitsSectors?: IStockSector[]
  bondsSectors?: any
  internationalSectors?: any
  cryptoSectors?: any
  stockAssetsSummary?: IPieData[]
  reitAssetsSummary?: IPieData[]
  bondsPieData?: IPieData[]
  internationalPieData?: IPieData[]
  cryptoPieData?: IPieData[]
}

export default function useAssetsSummary({
  sharesMap,
  reitsMap
}: IUseRowsData) {
  const [sliderMap, setSliderMap] = useState<ISliderMap[]>([] as ISliderMap[])

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

  const [state, dispatch] = useReducer(
    (
      prevState: AssetsSummary,
      action: {
        type: string
        payload?: AssetsSummary
      }
    ) => {
      return assetsSummaryReducer(prevState, action)
    },
    {
      stockSectors: [] as IStockSector[],
      reitsSectors: [] as IStockSector[],
      bondsSectors: [] as any,
      internationalSectors: [] as any,
      cryptoSectors: [] as any,
      stockAssetsSummary: [{ name: '', value: 0 }],
      reitAssetsSummary: [{ name: '', value: 0 }],
      bondsPieData: [{ name: '', value: 0 }],
      internationalPieData: [{ name: '', value: 0 }],
      cryptoPieData: [{ name: '', value: 0 }]
    }
  )

  const [isLoading, setIsLoading] = useState(false)

  const totalValue = parseFloat(
    stockRows.reduce((acc, row) => acc + row.currentValue, 0).toFixed(2)
  )

  const calculateAssetsSummary = useCallback(
    (sectors: IStockSector[], totalValue: number) => {
      const totalValueBySector = getTotalValueBySector(sectors)
      const totalValuesList = Object.keys(totalValueBySector).map(
        (key: string) => ({
          name: key,
          value: parseFloat((totalValueBySector[key] / totalValue).toFixed(4))
        })
      )
      return sortArrayAlphabetically<IPieData>(totalValuesList, 'name')
    },
    [sortArrayAlphabetically, getTotalValueBySector]
  )

  const calculateData = useCallback(
    (rows: any[], setSectors: any, setPieData: any) => {
      const totalValue = rows.reduce((acc, curr) => acc + curr.currentValue, 0)
      const sectors = rows.map((row: any) => row.asset).sort()

      const pieData = rows
        .map((row: any) => ({
          name: row.asset,
          value: row.currentValue,
          percentage: row.currentValue / totalValue
        }))
        .sort((a: any, b: any) => a.name.localeCompare(b.name))

      setSectors(sectors)
      setPieData(pieData)
    },
    []
  )

  useEffect(() => {
    if (!sharesMap || !reitsMap || totalValue <= 0) return

    setIsLoading(true)
    const stockSectors: IStockSector[] = walletStockSectors(
      stockRows,
      sharesMap
    )
    const reitSectors: IStockSector[] = walletReitSectors(reitRows, reitsMap)

    const stockPieData = calculateAssetsSummary(stockSectors, totalValue)
    const reitPieData = calculateAssetsSummary(reitSectors, totalValue)

    dispatch({
      type: 'SET_DATA',
      payload: {
        stockSectors: stockSectors,
        reitsSectors: reitSectors,
        stockAssetsSummary: stockPieData,
        reitAssetsSummary: reitPieData
      }
    })
    setIsLoading(false)
  }, [sharesMap, reitsMap, totalValue])

  useEffect(() => {
    if (totalValue <= 0) return
    setIsLoading(true)
    // Set data for bonds, international and crypto
    ;[
      { label: 'bonds', data: bondRows },
      { label: 'international', data: internationalRows },
      { label: 'crypto', data: cryptoRows }
    ].forEach((rows: any) => {
      if (!rows.data) return
      calculateData(
        rows.data,
        (sectors: any) =>
          dispatch({
            type: 'SET_DATA',
            payload: { [`${rows.label}Sectors`]: sectors }
          }),
        (pieData: any) =>
          dispatch({
            type: 'SET_DATA',
            payload: { [`${rows.label}PieData`]: pieData }
          })
      )
    })

    setIsLoading(false)
  }, [totalValue, bondRows, internationalRows, cryptoRows])

  useEffect(() => {
    if (
      stockGoals &&
      reitGoals &&
      bondGoals &&
      internationalGoals &&
      state.stockAssetsSummary &&
      state.reitAssetsSummary
    ) {
      setIsLoading(true)
      setSliderMap([
        {
          title: 'Ações',
          goals: stockGoals,
          data: state.stockAssetsSummary || [],
          sectors: state.stockSectors || []
        },
        {
          title: 'Fundos Imobiliários',
          goals: reitGoals,
          data: state.reitAssetsSummary,
          sectors: state.reitsSectors || []
        },
        {
          title: 'Renda Fixa',
          goals: bondGoals,
          data: state.bondsPieData || [],
          sectors: state.bondsSectors || []
        },
        {
          title: 'Internacional',
          goals: internationalGoals,
          data: state.internationalPieData || [],
          sectors: state.internationalSectors || []
        },
        {
          title: 'Crypto',
          goals: cryptoGoals,
          data: state.cryptoPieData || [],
          sectors: state.cryptoSectors || []
        }
      ])
    }
    setIsLoading(false)
  }, [
    stockGoals,
    reitGoals,
    bondGoals,
    state.stockAssetsSummary,
    internationalGoals,
    state.reitAssetsSummary
  ])

  return {
    sliderMap,
    isLoading
  }
}

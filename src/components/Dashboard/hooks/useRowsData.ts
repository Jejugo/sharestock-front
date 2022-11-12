import { sortArrayAlphabetically } from '@builders/arrays'
import useAssetTableData from 'hooks/useAssetTableData'
import { useEffect, useState } from 'react'
import { IPieData, IStockSector } from '../interfaces'

interface IArrayToObject<T> {
  [key: string]: T
}

interface IUseRowsData {
  sharesMap: IArrayToObject<IStockItem>
}

export default function useRowsData({ sharesMap }: IUseRowsData) {
  const { rows } = useAssetTableData()

  const [assetSectors, setAssetSectors] = useState<
    { name: string; sector: string; value: number }[]
  >([])
  const [pieChartData, setPieChartData] = useState<IPieData[]>([
    {
      name: '',
      value: 0
    }
  ])
  const totalValue = parseFloat(
    rows.reduce((acc, row) => acc + row.currentValue, 0).toFixed(2)
  )
  useEffect(() => {
    if (sharesMap && totalValue > 0) {
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

      const finalData = sortArrayAlphabetically<IPieData>(
        Object.keys(totalValueBySector).map((key: string) => ({
          name: key,
          value: parseFloat((totalValueBySector[key] / totalValue).toFixed(4))
        })),
        'name'
      )

      setPieChartData(finalData)
    }
  }, [sharesMap, totalValue])

  return {
    assetSectors,
    pieChartData
  }
}

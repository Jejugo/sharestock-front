import { sortArrayAlphabetically } from 'builders/arrays'
import { getTotalValueBySector, walletSectors } from 'builders/assets'
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
      const currentWalletSectors: IStockSector[] = walletSectors(
        rows,
        sharesMap
      )
      setAssetSectors(currentWalletSectors)

      const totalValueBySector = getTotalValueBySector(currentWalletSectors)
      console.log('totalValueBySector', totalValueBySector)

      const totalValuesList = Object.keys(totalValueBySector).map(
        (key: string) => ({
          name: key,
          value: parseFloat((totalValueBySector[key] / totalValue).toFixed(4))
        })
      )
      console.log('!!', totalValuesList)

      const finalData = sortArrayAlphabetically<IPieData>(
        totalValuesList,
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

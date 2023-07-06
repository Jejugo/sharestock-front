import { ITableRow } from 'components/AssetTable/interfaces'

export interface IAssetSectors {
  name: string
  sector: string
  value: number
}

export interface IValueBySector {
  [key: string]: number
}

interface IArrayToObject<T> {
  [key: string]: T
}

type sharesMap = IArrayToObject<IStockItem>

export const walletSectors = (
  rows: ITableRow[],
  sharesMap: sharesMap
): IAssetSectors[] =>
  rows.map((row) => {
    const sector = sharesMap[row.symbol].subsetor
    return {
      name: row.symbol,
      sector,
      value: row.currentValue
    }
  })

export const getTotalValueBySector = (
  walletSectors: IAssetSectors[]
): IValueBySector =>
  walletSectors.reduce(
    (
      acc: { [key: string]: number },
      wallet: { name: string; sector: string; value: number }
    ) => ({
      ...acc,
      [wallet.sector]: parseFloat(
        (acc[wallet.sector] + wallet.value).toFixed(3)
      )
    }),
    walletSectors.reduce(
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

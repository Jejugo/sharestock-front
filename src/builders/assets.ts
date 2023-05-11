import { ITableRow } from 'components/AssetTable/interfaces'
import { RecommendedPercentages } from 'features/dashboard/Dashboard/interfaces'

export interface IAssetSectors {
  name: string
  sector: string
  value: number
}

export interface IValueBySector {
  [key: string]: number
}

const stockScore = (userAsset: IStockItem): number => {
  let points = 0

  if (userAsset['p/l'] <= 15) points++
  if (userAsset['lpa'] > 1.5) points++
  if (userAsset['p/vp'] <= 1.5 && userAsset['p/vp'] > 0) points++
  if (userAsset.crescimento5Anos / 100 > 0) points++

  return points
}

interface IBuildAssetTableData {
  assets: IFirestoreGetAllUserAssets
  item: string
  recommendedPercentages: RecommendedPercentages
  totalValue: number
  assetPoints: IWalletResistancePoints
}

export const buildAssetTableData = ({
  assets,
  item,
  recommendedPercentages,
  totalValue,
  assetPoints
}: IBuildAssetTableData): ITableRow => ({
  cheapStockScore: stockScore(assets[item]),
  symbol: assets[item].papel.toLowerCase(),
  asset: assets[item].nome,
  recommended: recommendedPercentages[item].percentage,
  currentValue: parseInt(assets[item].quantity) * assets[item].cotacao,
  recommendedValue: parseFloat(
    (
      totalValue *
      (parseFloat(recommendedPercentages[item].percentage) / 100)
    ).toFixed(2)
  ),
  adjustment: `${Math.abs(
    parseFloat(recommendedPercentages[item].percentage) -
      ((parseFloat(assets[item].quantity) * assets[item].cotacao) /
        totalValue) *
        100
  ).toFixed(2)}% (R$${Math.abs(
    parseInt(assets[item].quantity) * assets[item].cotacao -
      parseFloat(
        (
          totalValue *
          (parseFloat(recommendedPercentages[item].percentage) / 100)
        ).toFixed(2)
      )
  ).toFixed(2)})`,
  grade: assetPoints[item],
  total: `${(
    ((parseInt(assets[item].quantity) * assets[item].cotacao) / totalValue) *
    100
  ).toFixed(2)}%`,
  quantity: parseInt(assets[item].quantity)
})

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

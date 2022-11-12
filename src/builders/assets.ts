import { ITableRow } from '@components/AssetTable/interfaces'
import { RecommendedPercentages } from '@components/Dashboard/interfaces'

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

  if (userAsset['P/L'] <= 15) points++
  if (parseInt(userAsset['lucro_por_acao']) > 1.5) points++
  if (userAsset['P/VP'] <= 1.5 && userAsset['P/VP'] > 0) points++
  if (parseFloat(userAsset['crescimento_médio_anual']) / 100 > 0) points++

  return points
}

interface IBuildAssetTableData {
  userAssets: IFirebaseUserAssets
  item: string
  recommendedPercentages: RecommendedPercentages
  totalValue: number
  assetPoints: IWalletResistancePoints
}

export const buildAssetTableData = ({
  userAssets,
  item,
  recommendedPercentages,
  totalValue,
  assetPoints
}: IBuildAssetTableData): ITableRow => ({
  cheapStockScore: stockScore(userAssets[item]),
  symbol: userAssets[item]['Papel'].toLowerCase(),
  asset: userAssets[item]['nome'],
  recommended: recommendedPercentages[item].percentage,
  currentValue:
    parseInt(userAssets[item]['quantity']) * userAssets[item]['Cotação'],
  recommendedValue: parseFloat(
    (
      totalValue *
      (parseFloat(recommendedPercentages[item].percentage) / 100)
    ).toFixed(2)
  ),
  adjustment: `${Math.abs(
    parseFloat(recommendedPercentages[item].percentage) -
      ((parseFloat(userAssets[item]['quantity']) *
        userAssets[item]['Cotação']) /
        totalValue) *
        100
  ).toFixed(2)}% (R$${Math.abs(
    parseInt(userAssets[item]['quantity']) * userAssets[item]['Cotação'] -
      parseFloat(
        (
          totalValue *
          (parseFloat(recommendedPercentages[item].percentage) / 100)
        ).toFixed(2)
      )
  ).toFixed(2)})`,
  grade: assetPoints[item],
  total: `${(
    ((parseInt(userAssets[item]['quantity']) * userAssets[item]['Cotação']) /
      totalValue) *
    100
  ).toFixed(2)}%`,
  quantity: parseInt(userAssets[item]['quantity'])
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
    const sector = sharesMap[row.symbol].segmento_bovespa
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

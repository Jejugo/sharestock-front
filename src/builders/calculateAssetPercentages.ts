interface IAssetPoints {
  name: string
  points: number
}

interface IAssetPercentages {
  [key: string]: number
}

export interface AssetPercentage {
  name: string
  percentage: string
  points: number
}

const NEGATIVE_DEFAULT = 0.01

const setNegativeDefault = (
  negativeAssets: IAssetPoints[]
): IAssetPercentages | undefined => {
  if (negativeAssets.length) {
    return negativeAssets.reduce(
      (acc, asset) => ({
        ...acc,
        [asset.name]: NEGATIVE_DEFAULT
      }),
      {}
    )
  }
  return
}

const getPositiveAssets = (resistancePoints: IWalletResistancePoints) =>
  Object.entries(resistancePoints)
    .map(([key]) => {
      if (resistancePoints[key] >= 0) {
        return { name: key, points: resistancePoints[key] }
      }
      return null
    })
    .filter((a) => a) as IAssetPoints[]

const getNegativeAssets = (resistancePoints: IWalletResistancePoints) =>
  Object.entries(resistancePoints)
    .map(([key]) => {
      if (resistancePoints[key] < 0) {
        return {
          name: key,
          points: resistancePoints[key]
        }
      }
      return null
    })
    .filter((a) => a) as IAssetPoints[]

const calculateNegativeCutPercentage = (
  negativeRealPercentages: IAssetPercentages | undefined,
  positiveAssets: IAssetPoints[]
): number => {
  if (negativeRealPercentages) {
    const negativesCount = Object.keys(negativeRealPercentages).length
    const totalPositivePoints = positiveAssets.reduce(
      (acc, curr) => acc + curr.points,
      0
    )
    const negativeRealSum = NEGATIVE_DEFAULT * negativesCount

    const cutPercentage =
      (negativeRealSum * totalPositivePoints) /
      (negativesCount - negativeRealSum * negativesCount)

    const totalCutPoints = cutPercentage * negativesCount
    return totalCutPoints
  }
  return 0
}

const calculatePositivePercentages = (
  positiveAssets: IAssetPoints[],
  totalNegativeCut: number
): IAssetPercentages => {
  return positiveAssets.reduce(
    (acc, asset) => ({
      ...acc,
      [asset.name]:
        asset.points /
        (positiveAssets.reduce((acc, asset) => acc + asset.points, 0) +
          totalNegativeCut)
    }),
    {}
  )
}

export default (
  resistancePoints: IWalletResistancePoints
): AssetPercentage[] => {
  const positiveAssets = getPositiveAssets(resistancePoints)
  const negativeAssets = getNegativeAssets(resistancePoints)

  const negativeRealPercentages = setNegativeDefault(negativeAssets)

  const totalNegativeCut = calculateNegativeCutPercentage(
    negativeRealPercentages,
    positiveAssets
  )

  const positiveAssetPercentages = calculatePositivePercentages(
    positiveAssets,
    totalNegativeCut
  )

  const allPercentages = {
    ...positiveAssetPercentages,
    ...negativeRealPercentages
  }

  const percentagesArray = Object.entries(allPercentages)
    .map(([key, value]: [string, number]) => ({
      name: key,
      percentage: `${
        value >= 0 && value < 0.01
          ? (0.01 * 100).toFixed(2)
          : (value * 100).toFixed(2)
      }%`,
      points: resistancePoints[key]
    }))
    .sort((a, b) => {
      const textA = a.name.toUpperCase()
      const textB = b.name.toUpperCase()
      return textA < textB ? -1 : textA > textB ? 1 : 0
    })
  return percentagesArray
}

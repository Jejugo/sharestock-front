interface IAssetStrategy {
  [key: string]: IStatement[]
}

export default (
  assetsToInvest: IAssetStrategy
): Promise<IWalletResistancePoints> =>
  new Promise((resolve, reject) => {
    const assetPoints = Object.keys(assetsToInvest).reduce(
      (acc: IWalletResistancePoints, assetKey: string) => ({
        ...acc,
        [assetKey]: assetsToInvest[assetKey].reduce(
          (acc: number, statement: IStatement): number => {
            if (statement.checked) return acc + 1 * parseInt(statement.weight)
            else if (!statement.checked)
              return acc + -1 * parseInt(statement.weight)
            return acc + 0
          },
          0
        )
      }),
      {}
    )
    if (!Object.keys(assetPoints).length) reject('No asset points found.')
    resolve(assetPoints)
  })

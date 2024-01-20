import { sortArrayAlphabetically } from '@builders/arrays'

export const strategyStatementsToArray = (strategyStatements: IStatement[]) =>
  sortArrayAlphabetically(
    Object.keys(strategyStatements).map((key) => ({
      ...strategyStatements[key as any]
    })),
    'statement'
  )

export const calculateTotalUserAssetsValue = (
  userAssets: IFirestoreGetUserStocks
) =>
  Object.keys(userAssets)
    .map((item) => userAssets[item])
    .reduce((acc, curr) => acc + parseInt(curr.quantity) * curr.cotacao, 0)

export * from './strategy'
export * from './user'

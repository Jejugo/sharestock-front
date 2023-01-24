import { sortArrayAlphabetically } from 'builders/arrays'
import Firestore from './Firestore'

export const getStrategyStatements = async (
  authUser: IUser
): Promise<IFirebaseStrategyStatements> =>
  (await Firestore().getData({
    collection: 'strategyStatements',
    id: authUser.uid
  })) as IFirebaseStrategyStatements

export const getAssetStrategy = async (
  authUser: IUser
): Promise<IFirebaseAssetStrategy> =>
  (await Firestore().getData({
    collection: 'assetStrategy',
    id: authUser.uid
  })) as IFirebaseAssetStrategy

export const getAllUserAssets = async (authUser: IUser) =>
  (await Firestore().getData({
    collection: 'assets',
    id: authUser.uid
  })) as IFirebaseAssets

export const strategyStatementsToArray = (
  strategyStatements: IFirebaseStrategyStatements
) =>
  sortArrayAlphabetically(
    Object.keys(strategyStatements).map((key) => ({
      ...strategyStatements[key]
    })),
    'statement'
  )

export const calculateTotalUserAssetsValue = (userAssets: IFirebaseAssets) =>
  Object.keys(userAssets)
    .map((item) => userAssets[item])
    .reduce((acc, curr) => acc + parseInt(curr.quantity) * curr['Cotação'], 0)

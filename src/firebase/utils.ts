import { sortArrayAlphabetically } from 'builders/arrays'
import Firestore from './Firestore'

export const getUserStrategyStatements = async (
  authUser: IUser
): Promise<IFirebaseStrategyStatements> =>
  (await Firestore().getAllItems({
    collection: 'userStrategyStatements',
    id: authUser.uid
  })) as IFirebaseStrategyStatements

export const getUserAssetStatements = async (
  authUser: IUser
): Promise<IFirebaseUserAssetStatements> =>
  (await Firestore().getAllItems({
    collection: 'userAssetStatements',
    id: authUser.uid
  })) as IFirebaseUserAssetStatements

export const getAllUserAssets = async (authUser: IUser) =>
  (await Firestore().getAllItems({
    collection: 'userAssets',
    id: authUser.uid
  })) as IFirebaseUserAssets

export const strategyStatementsToArray = (
  strategyStatements: IFirebaseStrategyStatements
) =>
  sortArrayAlphabetically(
    Object.keys(strategyStatements).map((key) => ({
      ...strategyStatements[key]
    })),
    'statement'
  )

export const calculateTotalUserAssetsValue = (
  userAssets: IFirebaseUserAssets
) =>
  Object.keys(userAssets)
    .map((item) => userAssets[item])
    .reduce((acc, curr) => acc + parseInt(curr.quantity) * curr['Cotação'], 0)

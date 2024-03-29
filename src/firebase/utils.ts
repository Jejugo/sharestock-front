import { sortArrayAlphabetically } from '@builders/arrays'
import Firestore from './Firestore'

export const getStrategyStatements = async (
  authUser: IUser
): Promise<Record<AssetTypes, IStatement[]>> =>
  await Firestore().getData({
    collection: 'userStrategy',
    id: authUser.uid
  })

export const getStocksStrategy = async (
  authUser: IUser
): Promise<IFirebaseAssetStrategy> =>
  (await Firestore().getData({
    collection: 'stocksStrategy',
    id: authUser.uid
  })) as IFirebaseAssetStrategy

export const getReitsStrategy = async (
  authUser: IUser
): Promise<IFirebaseAssetStrategy> =>
  (await Firestore().getData({
    collection: 'reitsStrategy',
    id: authUser.uid
  })) as IFirebaseAssetStrategy

export const getAllUserAssets = async (authUser: IUser) =>
  (await Firestore().getData({
    collection: 'userStocks',
    id: authUser.uid
  })) as IFirestoreGetUserStocks

export const getAllUserReits = async (authUser: IUser) =>
  (await Firestore().getData({
    collection: 'userReits',
    id: authUser.uid
  })) as IFirestoreGetUserStocks

export const getAllUserInternational = async (authUser: IUser) =>
  (await Firestore().getData({
    collection: 'userInternational',
    id: authUser.uid
  })) as any

export const getAllUserBonds = async (authUser: IUser) =>
  (await Firestore().getData({
    collection: 'userBonds',
    id: authUser.uid
  })) as any

export const getAllUserCrypto = async (authUser: IUser) =>
  (await Firestore().getData({
    collection: 'userCrypto',
    id: authUser.uid
  })) as any

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

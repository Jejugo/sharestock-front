import { formatSubmitData } from '@features/strategy/StrategyForm/utils'
import Firestore from '../../Firestore'

export const firestore = {
  // GLOBAL SETTERS AND GETTERS
  setStrategyStatements: async (authUser: IUser, data: unknown) => {
    await Firestore().setData({
      collection: 'userStrategy',
      id: authUser.uid,
      item: formatSubmitData(data)
    })
  },

  getStrategyStatements: async (
    authUser: IUser
  ): Promise<Record<AssetTypes, IStatement[]>> =>
    await Firestore().getData({
      collection: 'userStrategy',
      id: authUser.uid
    }),

  // STOCKS SETTERS AND GETTERS
  setStocksStrategy: async (authUser: IUser, data: unknown) => {
    await Firestore().setData({
      collection: 'stocksStrategy',
      id: authUser.uid,
      item: formatSubmitData(data)
    })
  },

  getStocksStrategy: async (authUser: IUser): Promise<IFirebaseAssetStrategy> =>
    (await Firestore().getData({
      collection: 'stocksStrategy',
      id: authUser.uid
    })) as IFirebaseAssetStrategy,

  // REITS SETTERS AND GETTER
  setReitsStrategy: async (authUser: IUser, data: unknown) => {
    await Firestore().setData({
      collection: 'reitsStrategy',
      id: authUser.uid,
      item: formatSubmitData(data)
    })
  },

  getReitsStrategy: async (authUser: IUser): Promise<IFirebaseAssetStrategy> =>
    (await Firestore().getData({
      collection: 'reitsStrategy',
      id: authUser.uid
    })) as IFirebaseAssetStrategy,

  // INTERNATIONAL SETTERS AND GETTERS
  setInternationalStrategy: async (authUser: IUser, data: unknown) => {
    await Firestore().setData({
      collection: 'internationalStrategy',
      id: authUser.uid,
      item: formatSubmitData(data)
    })
  },

  getInternationalStrategy: async (
    authUser: IUser
  ): Promise<IFirebaseAssetStrategy> =>
    (await Firestore().getData({
      collection: 'reitsStrategy',
      id: authUser.uid
    })) as IFirebaseAssetStrategy
}

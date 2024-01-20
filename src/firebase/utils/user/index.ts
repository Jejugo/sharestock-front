import Firestore from '../../Firestore'

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

import {
  getAllUserAssets,
  getAllUserReits,
  getAllUserInternational,
  getAllUserBonds,
  getAllUserCrypto
} from 'firebase/utils'

type IUserAssetList = {
  [key: string]: IUserStockItem | IUserReitItem
}

export const getAllAssetsByCategory = async (
  category: AssetTypes,
  authUser: IUser
): Promise<IUserAssetList> => {
  let assets

  if (category === 'stocks') {
    assets = (await getAllUserAssets(authUser)) as any
  }
  if (category === 'reits') {
    assets = (await getAllUserReits(authUser)) as any
  }
  if (category === 'international') {
    assets = (await getAllUserInternational(authUser)) as any
  }
  if (category === 'bonds') {
    assets = (await getAllUserBonds(authUser)) as any
  }
  if (category === 'crypto') {
    assets = (await getAllUserCrypto(authUser)) as any
  }

  return assets
}

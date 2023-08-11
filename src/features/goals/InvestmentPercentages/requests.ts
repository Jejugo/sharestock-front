import Firestore from 'firebase/Firestore'

interface DeleteDropdownItemRequest {
  itemId: string
  accessToken: string
  assetType: string
}

export const deleteDropdownItem = async ({
  itemId,
  accessToken,
  assetType
}: DeleteDropdownItemRequest) => {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_SHARE_API}/user/${assetType}/sectors/${itemId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ContentType: 'application/json'
        }
      }
    )
  } catch (err) {
    console.error('There was an error removing dropdown item: ', err)
  }
}

export const setNewDropdownItem = async (
  uniqueId: string,
  item: any,
  assetType: string,
  accessToken: string
) => {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_SHARE_API}/user/${assetType}/sectors`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ContentType: 'application/json'
        },
        body: JSON.stringify({
          item: {
            id: uniqueId,
            name: item,
            default: false
          }
        })
      }
    )
  } catch (err) {
    console.error('There was an error adding dropdown item: ', err)
  }
}

export const setFirestoreGoalsData = async (data: any, userId: string) => {
  const fireStoreData: any = {
    collection: 'goals',
    id: userId,
    item: data
  }
  try {
    await Firestore().setData(fireStoreData)
  } catch (err) {
    console.error('There was an error saving the Goals to Firebase', data)
  }
}

export const setFirestoreUserSector = async (
  data: any,
  assetType: AssetTypes,
  userId: string
) => {
  const fireStoreData: any = {
    collection: `userSectors${assetType}`,
    id: userId,
    item: {
      values: data.map((asset: any) => ({
        id: asset.id,
        name: asset.name,
        default: asset.default
      }))
    }
  }
  try {
    await Firestore().setData(fireStoreData)
  } catch (err) {
    console.error(
      `There was an error saving the Goals to user ${assetType} sector:`,
      data
    )
    console.log(err)
  }
}

export const getFirestoreGoals = async (userId: string) => {
  return await Firestore().getData({
    collection: 'goals',
    id: userId
  })
}

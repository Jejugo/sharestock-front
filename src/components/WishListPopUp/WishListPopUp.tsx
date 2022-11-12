import React, { useEffect, useState, useContext } from 'react'
import { WishListContext } from '../../context/WishList'
import { useAuth } from '../../context/AuthUserContext'
import Firestore from '../../firebase/Firestore'
import WishList from '../../components/WishList/WishList'

const WishListPopUp = () => {
  const [visible, setVisible] = useState(false)
  const { wishList, setWishList } = useContext(WishListContext)
  const { authUser } = useAuth()

  useEffect(() => {
    const getAllItemsFirestore = async () => {
      if (authUser) {
        const data = await Firestore().getAllItems({
          collection: 'watchlist',
          id: authUser.uid
        })
        if (data && data.shares) {
          setWishList(data.shares)
        }
      }
    }
    getAllItemsFirestore().catch((err) => console.error('error: ', err))
  }, [])

  const removeItem = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    item: string
  ): Promise<void> => {
    e.preventDefault()
    try {
      if (authUser) {
        setWishList((previousState) =>
          previousState.filter((previousItem) => previousItem !== item)
        )
        await Firestore().singleKeyRemoveArrayItem({
          collection: 'watchlist',
          id: authUser.uid,
          item
        })
      }
    } catch (err) {
      console.error(err)
      setWishList((previousState) => [...previousState, item])
    }
  }

  return (
    <WishList
      visible={visible}
      setVisible={setVisible}
      wishList={wishList}
      removeItem={removeItem}
    />
  )
}

export default WishListPopUp

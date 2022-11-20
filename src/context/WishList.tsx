import React, { createContext, useContext, useState } from 'react'
import { WishListProviderProps } from './interface'

interface IWishListContext {
  wishList: string[]
  setWishList: React.Dispatch<React.SetStateAction<string[]>>
}

const initialState: IWishListContext = {
  wishList: [],
  setWishList: () => undefined
}

export const WishListContext = createContext(initialState)

export const useWishList = () => useContext(WishListContext)

const WishListProvider = ({ children }: WishListProviderProps) => {
  const [wishList, setWishList] = useState<string[]>([])

  return (
    <WishListContext.Provider value={{ wishList, setWishList }}>
      {children}
    </WishListContext.Provider>
  )
}

export default WishListProvider

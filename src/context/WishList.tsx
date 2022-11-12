import React, { createContext, useState } from 'react'
import { WishListProviderProps } from './interface'

interface IWishListContext {
  wishList: string[]
  setWishList: React.Dispatch<React.SetStateAction<string[]>>
}

const initialState: IWishListContext = {
  wishList: [],
  setWishList: () => {}
}

export const WishListContext = createContext(initialState)

const WishListProvider = ({ children }: WishListProviderProps) => {
  const [wishList, setWishList] = useState<string[]>([])

  return (
    <WishListContext.Provider value={{ wishList, setWishList }}>
      {children}
    </WishListContext.Provider>
  )
}

export default WishListProvider

import React, { createContext, useContext, useState } from 'react'

interface WishListProviderProps {
  children: React.ReactNode
}
export interface IWishListContext {
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

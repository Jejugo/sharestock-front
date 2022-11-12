export interface WishListProviderProps {
  children: React.ReactNode
}

export interface IWishListContext {
  setWishList: React.Dispatch<React.SetStateAction<any>>
  wishList: string[]
}

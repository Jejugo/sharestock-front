import React, { useEffect } from 'react'
import * as S from './styles'
import DeleteIcon from '@mui/icons-material/Delete'

interface IWishList {
  visible: boolean
  wishList: string[]
  removeItem: (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    key: string
  ) => Promise<void> | void
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

function WishList({ visible, wishList, removeItem, setVisible }: IWishList) {
  let dropdownTimeout: NodeJS.Timeout

  // useEffect(() => {
  //   if (wishList.length) {
  //     setVisible(true);
  //     dropdownTimeout = setTimeout(() => {
  //       setVisible(false);
  //     }, 3000);
  //   }

  //   return () => clearTimeout(dropdownTimeout);
  // }, [wishList]);

  useEffect(() => {
    if (visible) {
      dropdownTimeout = setTimeout(() => setVisible(false), 3000)
    }
    return () => clearTimeout(dropdownTimeout)
  }, [visible])

  return (
    <>
      <S.WishList visible={visible}>
        <S.WishListTitle>Wish List</S.WishListTitle>
        {wishList &&
          wishList.map((wishItem, index) => (
            <div key={index}>
              <S.WishListTextWrapper
                onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) =>
                  removeItem(e, wishItem)
                }
              >
                <S.WishListText>{wishItem}</S.WishListText>
                <DeleteIcon style={{ color: 'black', cursor: 'pointer' }} />
              </S.WishListTextWrapper>
            </div>
          ))}
      </S.WishList>
      {!visible && (
        <S.Button onClick={() => setVisible(true)}>Show Wish List</S.Button>
      )}
    </>
  )
}

export default WishList

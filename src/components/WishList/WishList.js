import React, { useEffect } from 'react';
import * as S from './styles';
import DeleteIcon from '@mui/icons-material/Delete';

function WishList({ visible, wishList, removeItem, setVisible }) {
  let dropdownTimeout;

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
      dropdownTimeout = setTimeout(() => setVisible(false), 3000);
    }
    return () => clearTimeout(dropdownTimeout);
  }, [visible]);

  return (
    <>
      <S.WishList visible={visible}>
        <S.WishListTitle>Wish List</S.WishListTitle>
        {wishList &&
          wishList.map((wishItem, index) => (
            <div key={index}>
              <S.WishListTextWrapper onClick={e => removeItem(e, wishItem)}>
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
  );
}

export default WishList;

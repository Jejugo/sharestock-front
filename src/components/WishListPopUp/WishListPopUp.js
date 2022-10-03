import React, { useEffect, useState, useContext } from 'react';
import { WishListContext } from '../../context/WishList';
import { useAuth } from '../../context/AuthUserContext';
import Firestore from '../../firebase/Firestore';
import WishList from '../../components/WishList/WishList';
import * as S from './styles';

const WishListPopUp = () => {
  const [visible, setVisible] = useState(false);
  const { wishList, setWishList } = useContext(WishListContext);
  const { authUser } = useAuth();

  useEffect(async () => {
    const data = await Firestore().getAllItems({
      collection: 'watchlist',
      id: authUser.uid,
    });
    if (data && data.shares) {
      setWishList(data.shares);
    }
  }, []);

  const removeItem = async (e, item) => {
    e.preventDefault();
    try {
      setWishList(previousState =>
        previousState.filter(previousItem => previousItem !== item),
      );
      await Firestore().removeFromArray({
        collection: 'watchlist',
        id: authUser.uid,
        item,
      });
    } catch (err) {
      console.error(err);
      setWishList(previousState => [...previousState, item]);
    }
  };

  return (
    <WishList
      visible={visible}
      setVisible={setVisible}
      wishList={wishList}
      removeItem={removeItem}
    />
  );
};

export default WishListPopUp;

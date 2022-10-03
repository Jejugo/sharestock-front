import RowItem from './RowItem/RowItem';
import React, { useContext } from 'react';
import indicatorsValidator from '../../../validations/indicators';
import { WishListContext } from '../../../context/WishList';
import { useAuth } from '../../../context/AuthUserContext';
import Firestore from '../../../firebase/Firestore';
import * as S from './styles.js';

const Rows = ({ filteredItems, fixTableHeader }) => {
  const { setWishList } = useContext(WishListContext);
  const { authUser } = useAuth();

  const addToWatchList = async (e, item) => {
    e.preventDefault();
    try {
      setWishList(previousState =>
        previousState.find(previousItem => previousItem === item)
          ? previousState
          : [...previousState, item.Papel],
      );
      await Firestore().addToArray({
        collection: 'watchlist',
        id: authUser.uid,
        itemKey: 'shares',
        item: item.Papel,
      });
    } catch (error) {
      console.error(error);
      setWishList(previousState =>
        previousState.filter(previousItem => previousItem !== item.Papel),
      );
    }
  };

  return (
    <>
      <section id="share-data">
        <S.RowHeader fixTableHeader={fixTableHeader}>
          <S.FirstRow>Ação</S.FirstRow>
          <S.FirstRow>Cotação</S.FirstRow>
          <S.FirstRow>P/L</S.FirstRow>
          <S.FirstRow>P/VP</S.FirstRow>
          <S.FirstRow>EV/EBITDA</S.FirstRow>
          <S.FirstRow>Cresc 5 Anos</S.FirstRow>
          <S.FirstRow>DY.</S.FirstRow>
          <S.FirstRow>Div.Brut/Pat.</S.FirstRow>
          <S.FirstRow>Liq. Corrente</S.FirstRow>
          <S.FirstRow>Margem Liq</S.FirstRow>
          <S.FirstRow>ROE</S.FirstRow>
        </S.RowHeader>
        {filteredItems.map((item, index) => (
          <RowItem
            key={index}
            item={item}
            index={index}
            indicatorsValidator={indicatorsValidator}
            addToWatchList={addToWatchList}
          />
        ))}
      </section>
    </>
  );
};

export default Rows;

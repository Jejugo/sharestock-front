import RowItem from './RowItem/RowItem'
import React, { useContext, useEffect } from 'react'
import { IWishListContext, WishListContext } from '../../../context/WishList'
import { useAuth } from '../../../context/AuthUserContext'
import Firestore from '../../../firebase/Firestore'
import * as S from './styles'

interface RowsProps {
  filteredItems: IFundamentusStockItem[]
  fixTableHeader: boolean
}

const Rows = ({ filteredItems, fixTableHeader }: RowsProps) => {
  const { wishList, setWishList } = useContext(
    WishListContext
  ) as IWishListContext
  const { authUser } = useAuth() as IAuthUserContext

  const addToWatchList = async (
    e: React.MouseEvent<HTMLDivElement>,
    item: any
  ): Promise<void> => {
    e.preventDefault()
    try {
      if (authUser) {
        setWishList((previousState: string[]) =>
          previousState.find((previousItem: string) => previousItem === item)
            ? previousState
            : [...previousState, item.Papel]
        )
        await Firestore().addArrayItemToFirestoreKey({
          collection: 'watchlist',
          id: authUser.uid,
          itemKey: 'shares',
          item: item.Papel
        })
      }
    } catch (error) {
      console.error(error)
      setWishList((previousState: string[]) =>
        previousState.filter(
          (previousItem: string) => previousItem !== item.Papel
        )
      )
    }
  }

  return (
    <>
      <section id="share-data">
        <S.RowHeader fixTableHeader={fixTableHeader}>
          <S.FirstRow>Ação</S.FirstRow>
          <S.FirstRow>Cotação</S.FirstRow>
          <S.FirstRow>EV/EBITDA</S.FirstRow>
          <S.FirstRow>P/L</S.FirstRow>
          <S.FirstRow>P/VP</S.FirstRow>
          <S.FirstRow>Cresc 5 Anos</S.FirstRow>
          <S.FirstRow>DY.</S.FirstRow>
          <S.FirstRow>Div.Brut/Pat.</S.FirstRow>
          <S.FirstRow>Liq. Corrente</S.FirstRow>
          <S.FirstRow>Margem Liq</S.FirstRow>
          <S.FirstRow>ROE</S.FirstRow>
        </S.RowHeader>
        {filteredItems.map((item, index) => (
          <RowItem key={index} item={item} addToWatchList={addToWatchList} />
        ))}
      </section>
    </>
  )
}

export default Rows

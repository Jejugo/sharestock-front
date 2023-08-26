import RowItem from './RowItem/RowItem'
import React, { useContext, useEffect, useState } from 'react'
import { IWishListContext, WishListContext } from '@context/WishList'
import { useAuth } from '@context/AuthUserContext'
import Firestore from '../../../firebase/Firestore'
import * as S from './styles'

interface RowsProps {
  filteredItems: IStockItem[] | IReitItem[]
  fixTableHeader: boolean
  columns: any[]
}

// Define a type for the sort state
type SortState = {
  column: string | null
  direction: 'asc' | 'desc'
}

const Rows = ({ filteredItems, fixTableHeader, columns }: RowsProps) => {
  const { setWishList } = useContext(WishListContext) as IWishListContext
  const { authUser } = useAuth() as IAuthUserContext
  const [sortedItems, setSortedItems] = useState<IStockItem[] | IReitItem[]>([])
  const [sortState, setSortState] = useState<SortState>({
    column: null,
    direction: 'asc'
  })

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

  const handleSetColumnsToSort = (name: string) => {
    setSortedItems((prevState) => {
      // Determine the new sort direction based on the current state
      const direction =
        sortState.column === name && sortState.direction === 'asc'
          ? 'desc'
          : 'asc'

      // Sort the items based on the selected column and direction
      const sorted = prevState.sort((a: any, b: any) => {
        if (a[name] === undefined || b[name] === undefined) return 0
        if (direction === 'asc') {
          return a[name] < b[name] ? -1 : a[name] > b[name] ? 1 : 0
        } else {
          return a[name] > b[name] ? -1 : a[name] < b[name] ? 1 : 0
        }
      })

      // Update the sort state with the new column and direction
      setSortState({ column: name, direction })

      return sorted
    })
  }

  useEffect(() => {
    setSortedItems(filteredItems)
  }, [filteredItems])

  return (
    <>
      <section id="share-data">
        <S.RowHeader fixTableHeader={fixTableHeader}>
          {columns.map((column, index) => (
            <S.FirstRow
              key={index}
              onClick={() => handleSetColumnsToSort(column.name)}
            >
              {column.label}
            </S.FirstRow>
          ))}
        </S.RowHeader>
        {sortedItems.length > 0
          ? sortedItems.map((item: any, index) => (
              <RowItem
                key={index}
                item={item}
                addToWatchList={addToWatchList}
                columns={columns}
              />
            ))
          : null}
      </section>
    </>
  )
}

export default Rows

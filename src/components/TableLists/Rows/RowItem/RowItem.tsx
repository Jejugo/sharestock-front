import React from 'react'
import indicatorsValidator from 'validations/stocks/indicators'
import * as S from './styles'

interface RowItemColum {
  label: string
  name: string
}

interface RowListProps {
  item: IStockItem & IReitItem
  addToWatchList: (e: React.MouseEvent<HTMLDivElement>, item: any) => any
  columns: RowItemColum[]
}

const RowItem = ({ item, addToWatchList, columns }: RowListProps) => {
  return (
    <div>
      <S.Row name={item.papel}>
        {columns.map((column: RowItemColum) => (
          <>
            <S.RowItemPlus
              onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                addToWatchList(e, item)
              }
            >
              +
            </S.RowItemPlus>
            <S.RowItem status={indicatorsValidator(item, column.name)}>
              {item[column?.name as keyof IStockItem] ?? '-'}
            </S.RowItem>
          </>
        ))}
      </S.Row>
    </div>
  )
}

export default RowItem

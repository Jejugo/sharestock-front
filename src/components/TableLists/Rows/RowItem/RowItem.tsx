import React from 'react'
import { stocksIndicatorsValidator } from '@validations/stocks/indicators'
import * as S from './styles'
import { reitsIndicatorsValidator } from '@validations/reits/indicators'

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
  const isStockItem = (item: any): item is IStockItem => {
    return 'numeroAcoes' in item
  }

  return (
    <div>
      <S.Row name={item.papel}>
        {columns.map((column: RowItemColum, index: number) => (
          <React.Fragment key={index}>
            <S.RowItemPlus
              onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                addToWatchList(e, item)
              }
            >
              +
            </S.RowItemPlus>
            <S.RowItem
              status={
                isStockItem(item)
                  ? stocksIndicatorsValidator(item, column.name)
                  : reitsIndicatorsValidator(item, column.name)
              }
            >
              {item[column?.name as keyof IStockItem] ?? '-'}
            </S.RowItem>
          </React.Fragment>
        ))}
      </S.Row>
    </div>
  )
}

export default RowItem

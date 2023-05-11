import React from 'react'
import indicatorsValidator from 'validations/indicators'
import * as S from './styles'

interface RowListProps {
  item: IStockItem
  addToWatchList: (e: React.MouseEvent<HTMLDivElement>, item: any) => any
}

const RowList = ({ item, addToWatchList }: RowListProps) => {
  return (
    <div>
      <S.Row name={item.papel}>
        <S.RowItemPlus
          onClick={(e: React.MouseEvent<HTMLDivElement>) =>
            addToWatchList(e, item)
          }
        >
          +
        </S.RowItemPlus>
        <S.RowItem status={indicatorsValidator(item, 'papel')}>
          {item.papel}
        </S.RowItem>
        <S.RowItem status={indicatorsValidator(item, 'cotacao')}>
          {item.cotacao}
        </S.RowItem>
        <S.RowItem status={indicatorsValidator(item, 'ev/ebitda')}>
          {item['ev/ebitda']}
        </S.RowItem>
        <S.RowItem status={indicatorsValidator(item, 'p/l')}>
          {item['p/l']}
        </S.RowItem>
        <S.RowItem status={indicatorsValidator(item, 'p/vp')}>
          {item['p/vp']}
        </S.RowItem>
        <S.RowItem status={indicatorsValidator(item, 'crescimento5Anos')}>
          {item.crescimento5Anos}
        </S.RowItem>
        <S.RowItem status={indicatorsValidator(item, 'dividendYield')}>
          {item.dividendYield}
        </S.RowItem>
        <S.RowItem status={indicatorsValidator(item, 'dividaBruta/pl')}>
          {item['dividaBruta/pl']}
        </S.RowItem>
        <S.RowItem status={indicatorsValidator(item, 'liquidezCorrente')}>
          {item.liquidezCorrente}
        </S.RowItem>
        <S.RowItem status={indicatorsValidator(item, 'margemLiquida')}>
          {item.margemLiquida}
        </S.RowItem>
        <S.RowItem status={indicatorsValidator(item, 'roe')}>
          {item.roe}
        </S.RowItem>
      </S.Row>
    </div>
  )
}

export default RowList

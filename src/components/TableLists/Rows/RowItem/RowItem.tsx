import React from 'react'
import indicatorsValidator from '@validations/indicators'
import * as S from './styles'

interface RowListProps {
  item: IFundamentusStockItem
  addToWatchList: (e: React.MouseEvent<HTMLDivElement>, item: any) => any
}

const RowList = ({ item, addToWatchList }: RowListProps) => {
  return (
    <div>
      <S.Row name={item['Papel']}>
        <S.RowItemPlus
          onClick={(e: React.MouseEvent<HTMLDivElement>) =>
            addToWatchList(e, item)
          }
        >
          +
        </S.RowItemPlus>
        <S.RowItem status={indicatorsValidator(item, 'Papel')}>
          {item['Papel']}
        </S.RowItem>
        <S.RowItem status={indicatorsValidator(item, 'Cotação')}>
          {item['Cotação']}
        </S.RowItem>
        <S.RowItem status={indicatorsValidator(item, 'EV/EBITDA')}>
          {item['EV/EBITDA']}
        </S.RowItem>
        <S.RowItem status={indicatorsValidator(item, 'P/L')}>
          {item['P/L']}
        </S.RowItem>
        <S.RowItem status={indicatorsValidator(item, 'P/VP')}>
          {item['P/VP']}
        </S.RowItem>
        <S.RowItem status={indicatorsValidator(item, 'Cresc.5anos')}>
          {item['Cresc.5anos']}
        </S.RowItem>
        <S.RowItem status={indicatorsValidator(item, 'Dividend Yield')}>
          {item['Dividend Yield']}
        </S.RowItem>
        <S.RowItem status={indicatorsValidator(item, 'Dívida Bruta/Patrim.')}>
          {item['Dívida Bruta/Patrim.']}
        </S.RowItem>
        <S.RowItem status={indicatorsValidator(item, 'Líq. Corrente')}>
          {item['Líq. Corrente']}
        </S.RowItem>
        <S.RowItem status={indicatorsValidator(item, 'Margem Líquida')}>
          {item['Margem Líquida']}
        </S.RowItem>
        <S.RowItem status={indicatorsValidator(item, 'ROE')}>
          {item['ROE']}
        </S.RowItem>
      </S.Row>
    </div>
  )
}

export default RowList

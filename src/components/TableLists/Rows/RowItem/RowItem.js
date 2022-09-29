import React from 'react';
import * as S from './styles';

const RowList = ({ item, indicatorsValidator, addToWatchList }) => {
  return (
    <div>
      <S.Row name={item['Papel']}>
        <S.RowItemPlus
          onClick={e => addToWatchList(e, item)}
        >
          +
        </S.RowItemPlus>
        <S.RowItem status={indicatorsValidator(item, 'Papel')}>
          {item['Papel']}
        </S.RowItem>
        <S.RowItem status={indicatorsValidator(item, 'P/L')}>
          {item['Cotação']}
        </S.RowItem>
        <S.RowItem status={indicatorsValidator(item, 'P/L')}>
          {item['P/L']}
        </S.RowItem>
        <S.RowItem status={indicatorsValidator(item, 'P/L')}>
          {item['P/VP']}
        </S.RowItem>
        <S.RowItem status={indicatorsValidator(item, 'Cotação')}>
          {item['EV/EBITDA']}
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
  );
};

export default RowList;

import * as S from './styles';

const RowList = ({ item, index, validator, addToWatchList, filteredItems }) => {
  return (
    <div>
      <S.Row name={item['Papel']} key={index}>
        <S.RowItem status={validator()} onClick={e => addToWatchList(e, item)}>
          +
        </S.RowItem>
        <S.RowItem status={validator(item, 'Papel')}>{item['Papel']}</S.RowItem>
        <S.RowItem status={validator(item, 'P/L')}>{item['Cotação']}</S.RowItem>
        <S.RowItem status={validator(item, 'P/L')}>{item['P/L']}</S.RowItem>
        <S.RowItem status={validator(item, 'P/L')}>{item['P/VP']}</S.RowItem>
        <S.RowItem status={validator(item, 'Cotação')}>
          {item['EV/EBITDA']}
        </S.RowItem>
        <S.RowItem status={validator(item, 'Cresc.5anos')}>
          {item['Cresc.5anos']}
        </S.RowItem>
        <S.RowItem status={validator(item, 'Dividend Yield')}>
          {item['Dividend Yield']}
        </S.RowItem>
        <S.RowItem status={validator(item, 'Dívida Bruta/Patrim.')}>
          {item['Dívida Bruta/Patrim.']}
        </S.RowItem>
        <S.RowItem status={validator(item, 'Líq. Corrente')}>
          {item['Líq. Corrente']}
        </S.RowItem>
        <S.RowItem status={validator(item, 'Margem Líquida')}>
          {item['Margem Líquida']}
        </S.RowItem>
        <S.RowItem status={validator(item, 'ROE')}>{item['ROE']}</S.RowItem>
      </S.Row>
    </div>
  );
};

export default RowList;

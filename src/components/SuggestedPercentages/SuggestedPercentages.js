import React, { useState, useEffect } from 'react';
import calculateAssetPercentages from '../../builders/calculateAssetPercentages';
import DeleteIcon from '@mui/icons-material/Delete';

import * as S from './styles';
import TableComponent from '../TableComponent';

const columnsNames = [
  { id: 'name', label: 'Nome', minWidth: 170 },
  { id: 'points', label: 'Resistência %', minWidth: 100 },
  {
    id: 'percentages',
    label: 'Sugestão',
    minWidth: 100,
    align: 'right',
  },
];

export default function SuggestedPercentages({
  walletResistancePoints,
  removeAssets,
  titleRef,
}) {
  const [walletSuggestedPercentages, setWalletSuggestedPercentages] = useState(
    [],
  );
  const [, setResistancePointsFormatted] = useState([]);

  const formatResistancePoints = resistancePoints =>
    Object.entries(resistancePoints).map(([key, value]) => ({
      name: key,
      points: value,
    }));

  const setPercentages = resistancePoints => {
    const percentagesArray = calculateAssetPercentages(resistancePoints);
    const formattedResistancePoints = formatResistancePoints(resistancePoints);

    setResistancePointsFormatted(formattedResistancePoints);
    return percentagesArray;
  };

  useEffect(() => {
    const percentagesResult = setPercentages(walletResistancePoints);
    setWalletSuggestedPercentages(percentagesResult);
  }, [walletResistancePoints]);

  return (
    <S.SuggestedPercentages>
      <S.BigTitle>Porcentagens de Risco</S.BigTitle>
      <S.Title ref={titleRef}>
        Essas são as porcentages recomendadas para sua carteira:
      </S.Title>
      {/* <S.ScoreView>
        <S.Points color="green">
          <p>Pontos positivos: </p>
        </S.Points>
        <S.Points color="red">
          <p>Pontos negativos: </p>
        </S.Points>
        <S.Points color="orange">
          <p>Máximo: </p>
        </S.Points>
      </S.ScoreView> */}
      <S.SuggestedListWrapper>
        <S.SuggestedList>
          <S.SuggestedListItem>Nome </S.SuggestedListItem>
          <S.SuggestedListItem>Resistência</S.SuggestedListItem>
          <S.SuggestedListItem>Sugestão</S.SuggestedListItem>
          <S.SuggestedListItem></S.SuggestedListItem>
        </S.SuggestedList>

        {walletSuggestedPercentages.map(asset => (
          <S.SuggestedList>
            <S.SuggestedListItem>{asset.name} </S.SuggestedListItem>
            <S.SuggestedListItem>{asset.points}</S.SuggestedListItem>
            <S.SuggestedListItem>{asset.percentage}</S.SuggestedListItem>
            <DeleteIcon onClick={e => removeAssets(e, asset.name)} />
          </S.SuggestedList>
        ))}
      </S.SuggestedListWrapper>
    </S.SuggestedPercentages>
  );
}

import React, { useState, useEffect, SetStateAction } from 'react'
import calculateAssetPercentages from '../../builders/calculateAssetPercentages'
import DeleteIcon from '@mui/icons-material/Delete'

import * as S from './styles'
import { ISuggestedAssetsPercentage } from './interfaces'
import { IAssetQuantities } from 'features/invest/InvestComponent/interfaces'

interface PercentagesArray {
  name: string
  percentage: string
  points: number
}

interface IWalletResistancePoints {
  [key: string]: number
}

interface ISuggestedPercentages {
  walletResistancePoints: IWalletResistancePoints
  titleRef: React.MutableRefObject<HTMLInputElement | null>
  investAmount: string
  quantities: IAssetQuantities
  removeAssets: (
    e: React.MouseEvent<SVGSVGElement | HTMLLIElement, MouseEvent>,
    key: string
  ) => Promise<void> | void
  setQuantities: React.Dispatch<SetStateAction<IAssetQuantities>>
  storeAssetStatements: () => void
}

export default function SuggestedPercentages({
  walletResistancePoints,
  titleRef,
  investAmount,
  quantities,
  removeAssets,
  setQuantities,
  storeAssetStatements
}: ISuggestedPercentages) {
  const [walletSuggestedPercentages, setWalletSuggestedPercentages] = useState<
    PercentagesArray[]
  >([])
  const [, setResistancePointsFormatted] = useState<
    ISuggestedAssetsPercentage[]
  >([])

  const formatResistancePoints = (resistancePoints: IWalletResistancePoints) =>
    Object.entries(resistancePoints).map(([key, value]) => ({
      name: key,
      points: value
    }))

  const setPercentages = (
    resistancePoints: IWalletResistancePoints
  ): PercentagesArray[] => {
    const percentagesArray = calculateAssetPercentages(resistancePoints)
    const formattedResistancePoints = formatResistancePoints(resistancePoints)

    setResistancePointsFormatted(formattedResistancePoints)
    return percentagesArray
  }

  const calculateInvestValue = (investAmount: string, percentage: string) =>
    (
      (parseInt(investAmount) * parseFloat(percentage.split('%')[0])) /
      100
    ).toFixed(2)

  useEffect(() => {
    const percentagesResult = setPercentages(walletResistancePoints)
    setWalletSuggestedPercentages(percentagesResult)
  }, [walletResistancePoints])

  return (
    <S.SuggestedPercentages>
      <S.BigTitle>Porcentagens de Risco</S.BigTitle>
      <S.Title ref={titleRef}>
        Essas são as porcentages recomendadas para sua carteira:
      </S.Title>
      <S.SuggestedListWrapper>
        <S.SuggestedList>
          <S.SuggestedListItem>Nome </S.SuggestedListItem>
          <S.SuggestedListItem>Resistência</S.SuggestedListItem>
          <S.SuggestedListItem>Sugestão</S.SuggestedListItem>
          <S.SuggestedListItem>Valor</S.SuggestedListItem>
          <S.SuggestedListItem>Quantidades</S.SuggestedListItem>
        </S.SuggestedList>

        {walletSuggestedPercentages.map((asset) => (
          <S.SuggestedList>
            <S.SuggestedListItem>{asset.name} </S.SuggestedListItem>
            <S.SuggestedListItem>{asset.points}</S.SuggestedListItem>
            <S.SuggestedListItem>{asset.percentage}</S.SuggestedListItem>
            <S.SuggestedListItem>
              {investAmount &&
                calculateInvestValue(investAmount, asset.percentage)}
            </S.SuggestedListItem>
            <S.SuggestedListItemInput
              onChange={(e) =>
                setQuantities((previousState) => ({
                  ...previousState,
                  [asset.name]: e.target.value
                }))
              }
              placeholder={'Adicione a quantidade'}
              value={quantities[asset.name] || ''}
            ></S.SuggestedListItemInput>
            <S.DeleteIcon>
              <DeleteIcon onClick={(e) => removeAssets(e, asset.name)} />
            </S.DeleteIcon>
          </S.SuggestedList>
        ))}
        <S.SaveButton onClick={storeAssetStatements}>
          Salve as quantidades
        </S.SaveButton>
      </S.SuggestedListWrapper>
    </S.SuggestedPercentages>
  )
}

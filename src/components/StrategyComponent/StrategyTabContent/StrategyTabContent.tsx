import React from 'react'
import StrategyList from '../StrategyList/StrategyList'
import StrategyInputValues from '../StrategyInputValues/StrategyInputValues'
import * as S from './StrategyTabContent.style'
import useStrategyComponent from '../hooks/useStrategyComponent'

export default function StrategyTabContent({
  tabName,
  onDeleteItem
}: {
  tabName: Omit<AssetTypes, 'overview'>
  onDeleteItem: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number,
    statement: string,
    name: 'stocks' | 'reits'
  ) => Promise<void>
}) {
  const { addStatement, calculateTotalPoints, handleWeightChange } =
    useStrategyComponent({
      name: tabName
    })

  return (
    <>
      {!!tabName && (
        <>
          <StrategyInputValues name={tabName} />
          <S.StrategyFormHeaderIcons>
            <S.StrategyFormBtn onClick={addStatement}>
              Adicionar
            </S.StrategyFormBtn>
            <S.StrategyFormTotalPoints>
              Total de Pontos: {calculateTotalPoints()}
            </S.StrategyFormTotalPoints>
          </S.StrategyFormHeaderIcons>
          <S.StrategyFormList>
            <StrategyList
              handleWeightChange={handleWeightChange}
              handleRemoveStatement={onDeleteItem}
              name={tabName}
            />
          </S.StrategyFormList>
          <S.StrategyFormBtnWrapper>
            <S.StrategyFormBtn type="submit">Salvar</S.StrategyFormBtn>
          </S.StrategyFormBtnWrapper>
        </>
      )}
    </>
  )
}

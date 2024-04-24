import React from 'react'
import StrategyList from '../StrategyList/StrategyList'
import StrategyInputValues from '../StrategyInputValues/StrategyInputValues'
import * as S from './StrategyTabContent.style'
import useStrategyComponent from '../hooks/useStrategyComponent'
import Button from '@components/Button/Button'

export default function StrategyTabContent({
  tab,
  onDeleteItem
}: {
  tab: any
  onDeleteItem: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number,
    statement: string,
    name: 'stocks' | 'reits'
  ) => Promise<void>
}) {
  const { addStatement, calculateTotalPoints, handleWeightChange } =
    useStrategyComponent({
      name: tab.name
    })

  return (
    <>
      {!!tab.name && (
        <>
          <StrategyInputValues name={tab.name} />
          <S.StrategyFormHeaderIcons>
            <S.StrategyFormHeaderButton>
              <Button text="Adicionar" width="medium" onClick={addStatement} />
            </S.StrategyFormHeaderButton>
            <S.StrategyFormTotalPoints>
              Total de Pontos: {calculateTotalPoints()}
            </S.StrategyFormTotalPoints>
          </S.StrategyFormHeaderIcons>
          <S.StrategyFormList>
            <StrategyList
              handleWeightChange={handleWeightChange}
              handleRemoveStatement={onDeleteItem}
              name={tab.name}
            />
          </S.StrategyFormList>
          <S.StrategyFormBtnWrapper>
            <Button type="submit" text="Salvar" width="medium" />
          </S.StrategyFormBtnWrapper>
        </>
      )}
    </>
  )
}

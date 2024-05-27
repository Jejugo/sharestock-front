import React from 'react'
import StrategyList from '../StrategyList/StrategyList'
import StrategyInputValues from '../StrategyInputValues/StrategyInputValues'
import * as S from './StrategyTabContent.style'
import useStrategyComponent from '../hooks/useStrategyComponent'
import Button from '@components/Button/Button'
import { useFormContext } from 'react-hook-form'

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

  const { getValues } = useFormContext()
  const strategies = getValues()[tab.name as 'stocks' | 'reits'] || {}

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
              strategies={strategies}
            />
          </S.StrategyFormList>
          {strategies.statements.length > 0 && (
            <S.StrategyFormBtnWrapper>
              <Button type="submit" text="Salvar" width="medium" />
            </S.StrategyFormBtnWrapper>
          )}
        </>
      )}
    </>
  )
}

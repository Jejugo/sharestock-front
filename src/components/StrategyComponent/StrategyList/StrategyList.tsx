import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import * as S from './StrategyList.style'
import { useController, useFormContext } from 'react-hook-form'

interface IStrategyList {
  handleWeightChange?: any
  handleRemoveStatement: any
  name: string
}

interface IWeight {
  [key: number]: string
}

interface IStatementsMap {
  statement: string
  weight: any
}

const dropdownWeights: IWeight = {
  1: 'Pouco Relevante',
  2: 'Relevante',
  3: 'Muito Relevante'
}

export default function StrategyList({
  handleWeightChange,
  handleRemoveStatement,
  name = 'stocks'
}: IStrategyList) {
  const { getValues } = useFormContext()
  const value = getValues()[name] || {}

  return (
    <div>
      {value.statements.map(
        ({ statement, weight }: IStatementsMap, index: number) => (
          <div key={index}>
            <S.StrategyFormListItem>
              <p>{`${statement}`}</p>
              <S.StockCheckListWeight>
                {dropdownWeights[weight]}
              </S.StockCheckListWeight>
              <S.StockCheckListInput
                type="number"
                onChange={(e) => handleWeightChange(e, statement)}
                value={weight}
              ></S.StockCheckListInput>
              <S.DeleteIconWrapper
                onClick={(e) =>
                  handleRemoveStatement(e, index, statement.toLowerCase(), name)
                }
              >
                <DeleteIcon />
              </S.DeleteIconWrapper>
            </S.StrategyFormListItem>
          </div>
        )
      )}
    </div>
  )
}

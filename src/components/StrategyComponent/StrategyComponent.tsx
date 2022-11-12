import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import Select, { ActionMeta, SingleValue } from 'react-select'

import * as S from './styles'

interface IStatementWeights {
  [key: string]: string
}

interface ISelectedWeight {
  value: string
  label: string
}

interface IStrategyComponent {
  handleInputStatement: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSetQuantity: (
    e: React.ChangeEvent<HTMLInputElement>,
    statement: string
  ) => void
  addStatement: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  removeStatement: (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    index: number,
    statement: string
  ) => void
  storeStatements: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  handleSelectDropdown: (
    newValue: SingleValue<ISelectedWeight>,
    actionMeta: ActionMeta<ISelectedWeight>
  ) => void
  inputStatement: string
  selectedWeight: ISelectedWeight
  statements: IStatement[]
  weights: ISelectedWeight[]
}

export default function StrategyComponent({
  handleSelectDropdown,
  handleInputStatement,
  addStatement,
  removeStatement,
  storeStatements,
  handleSetQuantity,
  inputStatement,
  selectedWeight,
  statements,
  weights
}: IStrategyComponent) {
  const calculateTotalPoints = () => {
    return statements.reduce(
      (acc: number, statement: IStatement) => acc + parseInt(statement.weight),
      0
    )
  }

  return (
    <section>
      <S.StrategyFormTitle>
        {' '}
        Defina sua estratégia - Crie afirmações defensivas e estipule um peso
        para cada uma delas:{' '}
      </S.StrategyFormTitle>
      <S.StrategyForm>
        <S.StrategyFormInput
          type="text"
          onChange={handleInputStatement}
          value={inputStatement}
          placeholder="Digite sua afirmação"
        ></S.StrategyFormInput>
        <S.DropdownStyle>
          <Select
            options={weights}
            value={selectedWeight}
            onChange={handleSelectDropdown}
          ></Select>
        </S.DropdownStyle>
        <S.StrategyFormHeaderIcons>
          <S.StrategyFormBtn onClick={addStatement}>
            Adicionar
          </S.StrategyFormBtn>
          <S.StrategyFormTotalPoints>
            Total de Pontos: {calculateTotalPoints()}
          </S.StrategyFormTotalPoints>
        </S.StrategyFormHeaderIcons>
      </S.StrategyForm>
      <S.StrategyFormList>
        {statements.map(({ statement, weight }, index) => (
          <div key={index}>
            <S.StrategyFormListItem>
              <p>{`${statement}`}</p>
              <S.StockCheckListWeight>
                {weight === '1'
                  ? 'Pouco Relevante'
                  : weight === '2'
                  ? 'Relevante'
                  : 'Muito Relevante'}
              </S.StockCheckListWeight>
              <S.StockCheckListInput
                type="number"
                onChange={(e) => handleSetQuantity(e, statement)}
                value={weight}
              ></S.StockCheckListInput>
              <S.DeleteIconWrapper
                onClick={(e) =>
                  removeStatement(e, index, statement.toLowerCase())
                }
              >
                <DeleteIcon></DeleteIcon>
              </S.DeleteIconWrapper>
            </S.StrategyFormListItem>
          </div>
        ))}
      </S.StrategyFormList>
      <S.StrategyFormBtnWrapper>
        <S.StrategyFormBtn onClick={(e) => storeStatements(e)}>
          Salvar
        </S.StrategyFormBtn>
      </S.StrategyFormBtnWrapper>
    </section>
  )
}

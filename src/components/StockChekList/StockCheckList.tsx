import {
  getUserStrategyStatements,
  strategyStatementsToArray,
  getUserAssetStatements
} from 'firebase/utils'
import React, { useEffect } from 'react'
import Switch from 'react-switch'
import { useAuth } from 'context/AuthUserContext'
import Firestore from 'firebase/Firestore'
import * as S from './styles'
import { sortArrayAlphabetically } from 'builders/arrays'

interface IStockCheckList {
  assetValue: string
  statements: IStatement[]
  setStatements: React.Dispatch<React.SetStateAction<IStatement[]>>
}

export default function StockCheckList({
  assetValue,
  statements,
  setStatements
}: IStockCheckList) {
  const { authUser } = useAuth()

  const updatedStrategyStatements = async (): Promise<IStatement[]> => {
    if (authUser) {
      const firestoreStatements = (await Firestore().getAllItems({
        collection: 'userStrategyStatements',
        id: authUser.uid
      })) as IFirebaseStrategyStatements

      const checklistStatements = Object.keys(firestoreStatements).map(
        (key: string) => firestoreStatements[key]
      ) as IStatement[]

      return checklistStatements
    }

    return []
  }

  /**
   * Check if strategy statements on firestore has changed and update it accordingly
   */
  const checkAgainstStrategyStatements = (
    assetStatements: IStatement[],
    updatedStatements: IStatement[]
  ) => {
    const removedStatements = assetStatements.filter(
      (assetStatement: IStatement) =>
        updatedStatements.find(
          (updatedStatement) =>
            updatedStatement.statement === assetStatement.statement &&
            updatedStatement.weight === assetStatement.weight
        )
    )

    const addedStatements = updatedStatements.filter(
      (updatedStatement) =>
        !assetStatements.find(
          (assetStatement) =>
            updatedStatement.statement === assetStatement.statement &&
            updatedStatement.weight === assetStatement.weight
        )
    )

    return {
      addedStatements,
      removedStatements
    }
  }

  useEffect(() => {
    const getFirebaseStrategyStatements = async () => {
      if (assetValue && authUser) {
        const assetListStatements = await getUserAssetStatements(authUser)

        const updatedStatements = await updatedStrategyStatements()

        if (assetValue in assetListStatements) {
          const assetStatements = assetListStatements[assetValue]

          const { addedStatements, removedStatements } =
            checkAgainstStrategyStatements(assetStatements, updatedStatements)

          setStatements(
            sortArrayAlphabetically(
              [...removedStatements, ...addedStatements],
              'statement'
            )
          )
        } else {
          setStatements(
            sortArrayAlphabetically([...updatedStatements], 'statement')
          )
        }
      }
    }

    getFirebaseStrategyStatements().catch((err) =>
      console.error('error: ', err)
    )
  }, [assetValue])

  useEffect(() => {
    const getAllStatements = async () => {
      if (authUser) {
        const strategyStatements = await getUserStrategyStatements(authUser)
        const formattedData = strategyStatementsToArray(strategyStatements)
        setStatements(formattedData)
      }
    }

    getAllStatements().catch((err) =>
      console.error('There was an error: ', err)
    )

    return () => {}
  }, [])

  const handleStatementCheck = (
    e: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    if (assetValue) {
      setStatements((prevState) => [
        ...prevState.map((state, i) => {
          if (i === index) {
            return { ...state, checked: !state.checked }
          } else return state
        })
      ])
    } else alert('Escolha um ativo primeiro.')
  }

  return (
    <section>
      <S.StockCheckList>
        {statements.length &&
          statements.map(({ statement, checked, weight }, index) => (
            <S.StockCheckListItem key={index}>
              <S.CheckListItemWrapper>
                <p>{statement}</p>
                <S.StockCheckListWeight>
                  {weight === '1'
                    ? 'Pouco Relevante'
                    : weight === '2'
                    ? 'Relevante'
                    : 'Muito Relevante'}
                </S.StockCheckListWeight>
                <Switch
                  onChange={(e: any) => handleStatementCheck(e, index)}
                  checked={checked}
                  disabled={!assetValue}
                />
              </S.CheckListItemWrapper>
            </S.StockCheckListItem>
          ))}
      </S.StockCheckList>
    </section>
  )
}

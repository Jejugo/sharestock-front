import {
  getStrategyStatements,
  strategyStatementsToArray,
  getStocksStrategy,
  getReitsStrategy
} from 'firebase/utils'
import React, { useEffect } from 'react'
import Switch from 'react-switch'
import { useAuth } from '@context/AuthUserContext'
import Firestore from 'firebase/Firestore'
import * as S from './styles'
import { sortArrayAlphabetically } from '@builders/arrays'

interface IAssetValue {
  value: string
  label: string
}

interface IStockCheckList {
  assetType: AssetTypes
  assetValue: IAssetValue
  statements: IStatement[]
  setStatements: (statements: IStatement[]) => void
}

export default function StockCheckList({
  assetType,
  assetValue,
  statements,
  setStatements
}: IStockCheckList) {
  const { authUser } = useAuth()

  const updatedStrategyStatements = async (): Promise<IStatement[]> => {
    if (authUser) {
      const firestoreStatements = (await Firestore().getData({
        collection: 'userStrategy',
        id: authUser.uid
      })) as IFirebaseAssetStrategy

      const checklistStatements = firestoreStatements[assetType]

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

  const getStrategy = async () => {
    if (authUser) {
      switch (assetType) {
        case 'stocks':
          return getStocksStrategy(authUser)
        case 'reits':
          return getReitsStrategy(authUser)
        default:
          return null
      }
    }
    return null
  }

  useEffect(() => {
    const getFirebaseStrategyStatements = async () => {
      if (assetValue.value && authUser) {
        const assetListStatements = await getStrategy()

        const updatedStatements = await updatedStrategyStatements()

        if (assetListStatements && assetValue.value in assetListStatements) {
          const assetStatements = Object.values(
            assetListStatements[assetValue.value]
          )

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
  }, [assetValue.value])

  useEffect(() => {
    const getAllStatements = async () => {
      if (authUser) {
        const strategyStatements = await getStrategyStatements(authUser)

        const formattedData = strategyStatementsToArray(
          strategyStatements[assetType]
        )

        setStatements(formattedData)
      }
    }

    getAllStatements().catch((err) =>
      console.error('There was an error: ', err)
    )
  }, [])

  const handleStatementCheck = (
    e: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    if (assetValue) {
      setStatements([
        ...statements.map((state, i) => {
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
        {statements.length
          ? statements.map(({ statement, checked, weight }, index) => (
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
            ))
          : null}
      </S.StockCheckList>
    </section>
  )
}

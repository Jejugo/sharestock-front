import React, { useState, useEffect } from 'react'
import { useAuth } from 'context/AuthUserContext'
import Firestore from 'firebase/Firestore'
import { getFirestore, doc, getDoc } from '@firebase/firestore'
import StrategyComponent from 'components/StrategyComponent/StrategyComponent'

import * as S from './styles'
import { ActionMeta, SingleValue } from 'react-select'
import Loading from 'components/Loading/Loading'
import {
  convertObjectKeysToList,
  sortArrayAlphabetically
} from 'builders/arrays'

interface ISelectedWeight {
  value: string
  label: string
}

const TRIM_ZEROES_STRING = /^0+(\d)|(\d)0+$/gm

export default function StrategyForm() {
  const db = getFirestore()
  const { authUser } = useAuth() as IAuthUserContext
  const [inputStatement, setInputStatement] = useState<string>('')
  const [selectedWeight, setSelectedWeight] = useState<ISelectedWeight>({
    value: '',
    label: ''
  })
  const [loading, setLoading] = useState<boolean>(false)
  const weights: ISelectedWeight[] = [
    { value: '1', label: 'Pouco Relevante' },
    { value: '2', label: 'Relevante' },
    { value: '3', label: 'Muito Relevante' }
  ]

  const [statements, setStatements] = useState<IStatement[]>([])

  const addStatement = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (!selectedWeight) {
      alert('Coloque um peso!')
      return
    }
    setStatements((prevState) => [
      ...prevState,
      {
        statement: inputStatement,
        weight: selectedWeight.value,
        checked: false
      }
    ])
    setSelectedWeight({ value: '', label: '' })
    setInputStatement('')
  }

  const removeStatement = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    index: number,
    statement: string
  ) => {
    if (confirm('Tem certeza que deseja excluir esse item da sua base?')) {
      if (authUser) {
        try {
          setLoading(true)
          const data = await Firestore().getData({
            collection: 'assetStrategy',
            id: authUser.uid
          })
          await checkAssetByAssetForDifferenceAndRemove(data, statement)
          await Firestore().deleteKeyValue({
            collection: 'userStrategyStatements',
            id: authUser.uid,
            field: index.toString()
          })
          setStatements((prevState) => [
            ...prevState.filter((item, i) => index !== i)
          ])
          setLoading(false)
        } catch (err) {
          console.error(err)
        }
      }
    }
  }

  const checkAssetByAssetForDifferenceAndRemove = async (
    data: any,
    statementToRemove: string
  ) =>
    new Promise((resolve, reject) => {
      let newState: any = convertObjectKeysToList(data)
      const convertedData = convertObjectKeysToList(data)
      try {
        // loop over each asset
        Object.entries(convertedData).map(([key, value]: [string, any]) => {
          // get asset from firebase
          const newValue = value.filter(
            (statement: IStatement) =>
              statement.statement.toLowerCase() !==
              statementToRemove.toLowerCase()
          )
          newState = {
            ...newState,
            [key]: {
              ...newValue
            }
          }
        })
        Firestore().setData({
          collection: 'assetStrategy',
          id: authUser.uid,
          item: newState
        })
        resolve('success')
      } catch (err) {
        if (err instanceof Error)
          console.error(
            `There was an error removing from firestore: ${err.message}`
          )
        reject(err)
      }
    })

  const checkAssetByAssetForDifferenceAndAdd = async (data: any) =>
    new Promise((resolve, reject) => {
      let newState: any = convertObjectKeysToList(data)
      try {
        Object.entries(newState).map(([key, value]: [string, any]) => {
          //each asset
          const assetStatementsList: string[] = value.map(
            (statement: IStatement): string => statement.statement.toLowerCase()
          )
          statements.forEach(async (statement: IStatement) => {
            if (
              !assetStatementsList.includes(statement.statement.toLowerCase())
            ) {
              newState = {
                ...newState,
                [key]: [
                  ...newState[key],
                  {
                    statement: statement.statement,
                    checked: statement.checked,
                    weight: statement.weight
                  }
                ]
              }
            }
          })
        })
        Firestore().setData({
          collection: 'assetStrategy',
          id: authUser.uid,
          item: newState
        })
        resolve('success')
      } catch (err) {
        if (err instanceof Error)
          console.error(
            `There was an error removing from firestore: ${err.message}`
          )
        reject(err)
      }
    })

  const assetStatementsUpdated = (data: any) =>
    Object.keys(data).reduce((acc, stock) => {
      const convertData = convertObjectKeysToList(data) as any
      return {
        ...acc,
        [stock]: convertData[stock].map((value: IStatement) => ({
          ...value,
          weight:
            statements.find(
              (statement) => statement.statement === value.statement
            )?.weight || value.weight
        }))
      }
    }, {})

  const storeStatements = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      if (authUser) {
        e.preventDefault()
        setLoading(true)
        const data = await Firestore().getData({
          collection: 'assetStrategy',
          id: authUser.uid
        })
        const dataWithUpdatedStatements = assetStatementsUpdated(data)
        await checkAssetByAssetForDifferenceAndAdd(dataWithUpdatedStatements)
        await Firestore().setDataByKey({
          collection: 'userStrategyStatements',
          id: authUser.uid,
          list: statements
        })
        setLoading(false)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleSelectDropdown = (
    newValue: SingleValue<ISelectedWeight>,
    actionMeta: ActionMeta<ISelectedWeight>
  ): void => {
    if (newValue) {
      setSelectedWeight(newValue)
    }
  }

  const handleInputStatement = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputStatement(e.target.value)

  const handleSetQuantity = (
    e: React.ChangeEvent<HTMLInputElement>,
    selectedStatement: string
  ) => {
    setStatements((prevState) =>
      prevState.map((statement: IStatement) => {
        if (statement.statement === selectedStatement) {
          return {
            ...statement,
            weight:
              parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 3
                ? e.target.value.replace(TRIM_ZEROES_STRING, '$1$2')
                : '0'
          }
        }
        return statement
      })
    )
  }

  useEffect(() => {
    const getUserStatements = async () => {
      if (authUser) {
        const statementsRef = doc(db, 'userStrategyStatements', authUser.uid)
        const statementsSnap = await getDoc(statementsRef)
        if (statementsSnap.exists()) {
          const strategyStatements = statementsSnap.data()

          const cachedStrategyStatementsList = sortArrayAlphabetically(
            Object.keys(strategyStatements).map((companyName, index) => ({
              statement: strategyStatements[companyName].statement,
              weight: strategyStatements[companyName].weight,
              checked: false
            })),
            'statement'
          )
          setStatements(cachedStrategyStatementsList)
        }
      }
    }

    getUserStatements().catch((err) =>
      console.error('There was an error: ', err)
    )
  }, [])

  return (
    <S.StrategyForm>
      {loading && <Loading />}
      <StrategyComponent
        handleInputStatement={handleInputStatement}
        addStatement={addStatement}
        storeStatements={storeStatements}
        removeStatement={removeStatement}
        handleSelectDropdown={handleSelectDropdown}
        handleSetQuantity={handleSetQuantity}
        inputStatement={inputStatement}
        selectedWeight={selectedWeight}
        statements={statements}
        weights={weights}
      ></StrategyComponent>
    </S.StrategyForm>
  )
}

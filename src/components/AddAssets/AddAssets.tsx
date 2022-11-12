import React, { useEffect, useState } from 'react'
import StockCheckList from '../StockChekList/StockCheckList'
import Select, { ActionMeta, SingleValue } from 'react-select'
import { useAuth } from '../../context/AuthUserContext'

import * as S from './styles'
import Firestore from 'firebase/Firestore'
import { convertObjectToArray } from 'builders/arrays'
interface IArrayToObject<T> {
  [key: string]: T
}
interface IAddAssets {
  setShowAddAsset: React.Dispatch<React.SetStateAction<boolean>>
  dropdownShares: IDropdownItem[]
  sharesMap: IArrayToObject<IStockItem>
}
;('')
interface ISelectedAsset {
  value: string
  label: string
}

export default function AddAssets({
  setShowAddAsset,
  dropdownShares,
  sharesMap
}: IAddAssets) {
  const { authUser } = useAuth() as IAuthUserContext
  const [statements, setStatements] = useState<IStatement[]>([])
  const [selectedAsset, setSelectedAsset] = useState<ISelectedAsset>({
    value: '',
    label: ''
  })
  const [quantity, setQuantity] = useState<string>('')

  const clearState = () => {
    setSelectedAsset({ value: '', label: '' })
    setQuantity('')
  }

  const isEveryCheckFalse = (statements: IStatement[]) =>
    statements.every(({ checked }) => !checked)

  const handleSelectInput = (
    newValue: SingleValue<ISelectedAsset>,
    actionMeta: ActionMeta<ISelectedAsset>
  ) => {
    if (newValue) setSelectedAsset(newValue)
  }

  const storeAssetStatements = async () => {
    try {
      if (!isEveryCheckFalse(statements) && quantity !== '' && authUser) {
        await Promise.all([
          await Firestore().addListByKey({
            collection: 'userAssetStatements',
            id: authUser.uid,
            list: statements,
            key: selectedAsset.value
          }),
          await Firestore().addObjectByKey({
            collection: 'userAssets',
            id: authUser.uid,
            list: [
              {
                ...sharesMap[selectedAsset.value],
                quantity: parseInt(quantity)
              }
            ],
            key: selectedAsset.value
          })
        ])

        clearState()
        alert('Dados salvos com sucesso.')
      } else {
        alert(
          'Você precisa selecionar pelo menos um item ou selecionar uma quantidade.'
        )
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const getAssetsFromFirebase = async () => {
      if (authUser) {
        const data = (await Firestore().getAllItems({
          collection: 'userStrategyStatements',
          id: authUser.uid
        })) as IFirebaseStrategyStatements
        const formattedData = convertObjectToArray<IStatement>(data)
        setStatements(formattedData)
      }
    }
    getAssetsFromFirebase().catch((err) =>
      console.error('There was an error: ', err)
    )
  }, [authUser])

  return (
    <section>
      <S.TopActions>
        <S.AddAssetBtn onClick={storeAssetStatements}>Salvar</S.AddAssetBtn>
        <S.AddAssetBtn
          onClick={() => setShowAddAsset((previousState) => !previousState)}
        >
          Voltar
        </S.AddAssetBtn>
      </S.TopActions>
      <div style={{ color: 'black' }}>
        <Select
          //@ts-ignore
          options={dropdownShares}
          placeholder="Ativo"
          onChange={handleSelectInput}
          value={selectedAsset}
        ></Select>
      </div>
      <S.AddCompanyInput
        placeholder="Quantidade"
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
      ></S.AddCompanyInput>
      <StockCheckList
        assetValue={selectedAsset.value}
        statements={statements}
        setStatements={setStatements}
      ></StockCheckList>
    </section>
  )
}

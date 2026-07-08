import React from 'react'
import StockCheckList from '@components/StockChekList/StockCheckList'
import { useController } from 'react-hook-form'
import { useAuth } from '@context/AuthUserContext'
import Select from 'react-select'
import * as S from './MyAssetContent.style'

import {
  getAllUserAssets,
  getAllUserReits,
  getAllUserInternational,
  getAllUserBonds,
  getAllUserCrypto
} from 'firebase/utils'
import Router from 'next/router'

const noStrategyTabs = (tabName: AssetTypes) =>
  ['bonds', 'international', 'crypto'].includes(tabName)

export default function MyAssetsContent({
  name,
  dropdownAssetList = []
}: {
  name: AssetTypes
  asset: string | string[] | undefined
  dropdownAssetList: IDropdownItem[]
}) {
  const {
    field: { onChange: onFieldChange, value }
  } = useController({
    name
  })
  const { authUser } = useAuth()
  const currentValue = value ?? {
    statements: [],
    selectedAsset: '',
    quantity: '',
    value: ''
  }

  const setStatements = (statements: IStatement[]) =>
    onFieldChange({
      ...currentValue,
      statements
    })

  const setDropdown = async (data: { value: number; label: string }) => {
    let assets

    if (name === 'stocks') {
      assets = (await getAllUserAssets(authUser)) as any
    }
    if (name === 'reits') {
      assets = (await getAllUserReits(authUser)) as any
    }
    if (name === 'international') {
      assets = (await getAllUserInternational(authUser)) as any
    }
    if (name === 'bonds') {
      assets = (await getAllUserBonds(authUser)) as any
    }
    if (name === 'crypto') {
      assets = (await getAllUserCrypto(authUser)) as any
    }

    const tabKey = noStrategyTabs(name) ? 'value' : 'quantity'

    onFieldChange({
      ...currentValue,
      selectedAsset: {
        value: data.value,
        label: data.label
      },
      [tabKey]: assets?.[data.value]?.[tabKey] ?? ''
    })
  }

  return (
    <div>
      <div style={{ color: 'black' }}>
        <Select
          options={dropdownAssetList}
          placeholder="Ativo"
          onChange={(data) => {
            if (!data) return
            if (noStrategyTabs(name)) {
              setDropdown(data)
              return
            }

            Router.push(`/invest/${name}/${data.value}`)
          }}
          value={currentValue.selectedAsset}
        ></Select>
      </div>
      <S.AddCompanyInput
        placeholder={noStrategyTabs(name) ? 'Valor' : 'Quantidade'}
        type="number"
        step="1"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onFieldChange({
            ...currentValue,
            [noStrategyTabs(name) ? 'value' : 'quantity']: e.target.value
          })
        }}
        value={currentValue[noStrategyTabs(name) ? 'value' : 'quantity'] ?? ''}
      ></S.AddCompanyInput>
      {currentValue.statements.length > 0 ? (
        <StockCheckList
          assetType={name}
          assetValue={currentValue.selectedAsset}
          statements={currentValue.statements}
          setStatements={setStatements}
        ></StockCheckList>
      ) : null}
    </div>
  )
}

import React from 'react'
import StockCheckList from '@components/StockChekList/StockCheckList'
import { useController } from 'react-hook-form'
import Select from 'react-select'
import * as S from './MyAssetContent.style'

export default function MyAssetsContent({
  name,
  dropdownAssetList = []
}: {
  name: AssetTypes
  dropdownAssetList: IDropdownItem[]
}) {
  const {
    field: { onChange: onFieldChange, value }
  } = useController({
    name
  })

  const setStatements = (statements: IStatement[]) =>
    onFieldChange({
      ...value,
      statements
    })

  return (
    <div>
      <div style={{ color: 'black' }}>
        <Select
          options={dropdownAssetList}
          placeholder="Ativo"
          onChange={(data) => {
            onFieldChange({
              ...value,
              selectedAsset: {
                value: data.value,
                label: data.label
              }
            })
          }}
          value={value.selectedAsset}
        ></Select>
      </div>
      {name === 'bonds' || name === 'international' || name === 'crypto' ? (
        <S.AddCompanyInput
          placeholder="Valor"
          type="number"
          step="any"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onFieldChange({
              ...value,
              value: e.target.value
            })
          }}
          value={value.value}
        ></S.AddCompanyInput>
      ) : (
        <S.AddCompanyInput
          placeholder="Quantidade"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFieldChange({
              ...value,
              quantity: e.target.value
            })
          }
          value={value.quantity}
        ></S.AddCompanyInput>
      )}

      {value.statements.length > 0 ? (
        <StockCheckList
          assetType={name}
          assetValue={value.selectedAsset}
          statements={value.statements}
          setStatements={setStatements}
        ></StockCheckList>
      ) : null}
    </div>
  )
}

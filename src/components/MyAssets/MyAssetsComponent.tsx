import React, { useState } from 'react'

import AssetsTableContainer from '../AssetTableContainer/AssetsTableContainer'
import AddAssets from '../AddAssets/AddAssets'

import * as S from './styles'

interface IArrayToObject<T> {
  [key: string]: T
}
interface IMyAssetsComponent {
  dropdownShares: IDropdownItem[]
  sharesMap: IArrayToObject<IStockItem>
}

export default function MyAssetsComponent({
  dropdownShares,
  sharesMap
}: IMyAssetsComponent) {
  const [showAddAsset, setShowAddAsset] = useState<boolean>(false)
  return (
    <S.MyAssets>
      <h1 style={{ fontSize: '32px', fontFamily: "'Amatic SC', cursive" }}> Analise seus ativos e aporte de acordo com as sugestões </h1>
      {!showAddAsset ? (
        <AssetsTableContainer
          setShowAddAsset={setShowAddAsset}
        ></AssetsTableContainer>
      ) : (
        <AddAssets
          setShowAddAsset={setShowAddAsset}
          dropdownShares={dropdownShares}
          sharesMap={sharesMap}
        ></AddAssets>
      )}
    </S.MyAssets>
  )
}

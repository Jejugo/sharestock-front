import React, { useState } from 'react'

import AssetsTableController from 'components/AssetTableController/AssetsTableController'
import AddAssets from 'features/my-assets/MyAssets/AddAssets/AddAssets'

import * as S from './styles'
import Title from 'components/Title/Title'

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
      <Title text="Analise seus ativos e aporte de acordo com as sugestões " />
      {!showAddAsset ? (
        <AssetsTableController
          setShowAddAsset={setShowAddAsset}
        ></AssetsTableController>
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

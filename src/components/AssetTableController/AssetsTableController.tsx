import Title from 'components/Title/Title'
import React from 'react'

import AssetTable from '../AssetTable/AssetTable'

import * as S from './styles'
import Button from 'components/Button/Button'

interface IAssetsTableController {
  setShowAddAsset: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AssetsTableController({
  setShowAddAsset
}: IAssetsTableController) {
  const handleShowAsset = () => {
    setShowAddAsset((previousState) => !previousState)
  }

  return (
    <>
      <S.TableTopActions>
        <Title text="Meus Ativos" />
        <Button
          onClick={handleShowAsset}
          text="Adicionar Ativo"
          size="medium"
        />
      </S.TableTopActions>

      <AssetTable />
    </>
  )
}

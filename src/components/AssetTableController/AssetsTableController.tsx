import Title from 'components/Title/Title'
import useAssetTableData from 'hooks/useAssetTableData'
import React, { useEffect } from 'react'

import AssetTable from '../AssetTable/AssetTable'

import * as S from './styles'
import Button from 'components/Button/Button'

interface IAssetsTableController {
  setShowAddAsset: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AssetsTableController({
  setShowAddAsset
}: IAssetsTableController) {
  const [page, setPage] = React.useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(25)
  const { rows, columns } = useAssetTableData()

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

      <AssetTable
        rows={rows}
        columns={columns}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      ></AssetTable>
    </>
  )
}

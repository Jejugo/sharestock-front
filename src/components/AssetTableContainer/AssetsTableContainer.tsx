import useAssetTableData from 'hooks/useAssetTableData'
import React, { useEffect } from 'react'

import AssetTable from '../AssetTable/AssetTable'

import * as S from './styles'

interface IAssetsTableContainer {
  setShowAddAsset: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AssetsTableContainer({
  setShowAddAsset
}: IAssetsTableContainer) {
  const [page, setPage] = React.useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(25)
  const { rows, columns } = useAssetTableData()

  return (
    <>
      <S.TableTopActions>
        <S.AssetsTitle>Meus Ativos</S.AssetsTitle>
        <S.AddAssetBtn
          onClick={() => setShowAddAsset((previousState) => !previousState)}
        >
          Adicionar Ativo
        </S.AddAssetBtn>
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

import Title from 'components/Title/Title'
import React from 'react'

import AssetTable from '../AssetTable/AssetTable'
import Router from 'next/router'
import * as S from './styles'
import Button from 'components/Button/Button'

export default function AssetsTableController() {
  const redirectToAddAsset = () => Router.push('/invest/stocks')

  return (
    <>
      <S.TableTopActions>
        <Title text="Meus Ativos" />
        <Button
          onClick={redirectToAddAsset}
          text="Adicionar Ativo"
          size="medium"
        />
      </S.TableTopActions>
      <AssetTable />
    </>
  )
}

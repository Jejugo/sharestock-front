import React from 'react'

import AssetsTableController from '@components/AssetTableController/AssetsTableController'

import * as S from './styles'
import Title from '@components/Title/Title'

export default function MyAssetsComponent() {
  return (
    <S.MyAssets>
      <Title text="Analise seus ativos e aporte de acordo com o Valor Recomendado" />
      <AssetsTableController />
    </S.MyAssets>
  )
}

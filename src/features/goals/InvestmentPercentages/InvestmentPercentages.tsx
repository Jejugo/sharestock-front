import React, { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useAuth } from 'context/AuthUserContext'
import Firestore from 'firebase/Firestore'
import assetTypes from './AssetTypes'

import * as S from './styles'
import AssetType from './AssetType/AssetType'
import Button from 'components/Button/Button'

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#9999ff',
  '#d6aa7f',
  '#a45a52',
  '#36c90e',
  '#cc3333',
  '#fbbaf7',
  '#82a8f4'
]

interface GoalsForm {
  stocks: { name: string; value: string; id: number }[]
  bonds: { name: string; value: string; id: number }[]
  reits: { name: string; value: string; id: number }[]
  international: { name: string; value: string; id: number }[]
  overview: { name: string; value: string; id: number }[]
}

interface IInvestmentPercentages {
  shareList: IStockItem[]
}

export default function InvestmentPercentages({
  shareList
}: IInvestmentPercentages) {
  const { authUser } = useAuth() as IAuthUserContext
  const defaultValues = {
    stocks: [{ name: '', value: '', id: 0 }],
    bonds: [{ name: '', value: '', id: 0 }],
    reits: [{ name: '', value: '', id: 0 }],
    international: [{ name: '', value: '', id: 0 }],
    overview: [{ name: '', value: '', id: 0 }]
  }
  const [sectors, setSectors] = useState<string[]>([])
  const methods = useForm<GoalsForm>({
    defaultValues
  })

  const onSubmit = (data: GoalsForm) => {
    Firestore().addAllItems({
      collection: 'assetTypePercentages',
      id: authUser.uid,
      item: data
    })
  }

  useEffect(() => {
    const getAllItems = async () => {
      const allItems = await Firestore().getAllItems({
        collection: 'assetTypePercentages',
        id: authUser.uid
      })
      methods.reset({ ...defaultValues, ...allItems })
    }
    const stockSectors = [
      ...new Set(
        shareList.map((shares: IStockItem) => shares['segmento_bovespa'])
      )
    ]
    setSectors(stockSectors)
    getAllItems().catch(console.error)
  }, [])

  return (
    <S.MainSection>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <S.PercentagesTitle>
            Defina a parcela de investimento nos tipos de negócio:
          </S.PercentagesTitle>
          {assetTypes.map((asset, index) => (
            <AssetType
              key={index}
              name={asset.name}
              title={asset.title}
              dropdownItems={
                asset.name === 'stocks' ? sectors : asset.dropdownItems
              }
              colors={COLORS}
            ></AssetType>
          ))}
          <S.ButtonWrapper>
            <Button type="submit" text="Salvar" size="medium" />
          </S.ButtonWrapper>
        </form>
      </FormProvider>
    </S.MainSection>
  )
}

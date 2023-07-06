import React, { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useAuth } from 'context/AuthUserContext'
import Firestore from 'firebase/Firestore'

import * as S from './styles'
import Button from 'components/Button/Button'
import AssetTypeTabContent from './AssetTypeTabContent/AssetTypeTabContent'
import AssetType from './AssetType/AssetType'
import assetTypes from 'const/AssetTypes'

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
  stockSectors: string[]
  reitSectors: string[]
  bondsSectors: string[]
  internationalSectors: string[]
}

export default function InvestmentPercentages({
  stockSectors,
  reitSectors,
  bondsSectors,
  internationalSectors
}: IInvestmentPercentages) {
  const { authUser } = useAuth() as IAuthUserContext

  const defaultValues = {
    stocks: [{ name: '', value: '', id: 0 }],
    bonds: [{ name: '', value: '', id: 0 }],
    reits: [{ name: '', value: '', id: 0 }],
    international: [{ name: '', value: '', id: 0 }],
    overview: [{ name: '', value: '', id: 0 }]
  }

  const methods = useForm<GoalsForm>({
    defaultValues
  })

  const onSubmit = async (data: GoalsForm) => {
    try {
      await Firestore().setData({
        collection: 'goals',
        id: authUser.uid,
        item: data
      })

      alert('Dados salvos com sucesso!')
    } catch (error) {
      // TODO: Handle error, possibly show a user-friendly message
      console.error(error)
    }
  }

  const formState = methods.watch()

  useEffect(() => {
    const getData = async () => {
      try {
        const allItems = await Firestore().getData({
          collection: 'goals',
          id: authUser.uid
        })
        methods.reset({ ...defaultValues, ...allItems })
      } catch (error) {
        // TODO: Handle error, possibly show a user-friendly message
        console.error(error)
      }
    }

    getData()
  }, [])

  const populateDropdown = (activeTab: string) => {
    if (activeTab === 'stocks') return stockSectors
    if (activeTab === 'reits') return reitSectors
    if (activeTab === 'bonds') return bondsSectors
    if (activeTab === 'international') return internationalSectors

    return assetTypes[activeTab].dropdownItems
  }

  return (
    <S.MainSection>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <S.PercentagesTitle>
            Defina a parcela de investimento nos tipos de negócio:
          </S.PercentagesTitle>
          <AssetTypeTabContent
            tabsList={Object.keys(assetTypes).map((assetType) => assetType)}
            defaultTab="stocks"
          >
            {(activeTab: string) => (
              <AssetType
                name={assetTypes[activeTab].name}
                title={assetTypes[activeTab].title}
                dropdownItems={populateDropdown(activeTab)}
                colors={COLORS}
              ></AssetType>
            )}
          </AssetTypeTabContent>
          {/* {Object.keys(assetTypes).map((assetType: any, index: number) => (
            <AssetType
              key={index}
              name={assetTypes[assetType].name}
              title={assetTypes[assetType].title}
              dropdownItems={
                assetTypes[assetType].name === 'stocks'
                  ? sectors
                  : assetTypes[assetType].dropdownItems
              }
              colors={COLORS}
            ></AssetType>
          ))} */}
          <S.ButtonWrapper>
            <Button type="submit" text="Salvar" size="medium" />
          </S.ButtonWrapper>
        </form>
      </FormProvider>
    </S.MainSection>
  )
}

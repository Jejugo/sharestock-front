import React, { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useAuth } from '@context/AuthUserContext'

import * as S from './styles'
import Button from '@components/Button/Button'
import AssetTypeTabContent from './AssetTypeTabContent/AssetTypeTabContent'
import AssetType from './AssetType/AssetType'
import assetTypes from '@const/AssetTypes'
import { GoalsForm, Sector } from './interfaces'

import { getFirestoreGoals, setFirestoreGoalsData } from './requests'
import { useSectors } from './hooks/useSectors'

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

const tabsList = Object.values(assetTypes)

interface IInvestmentPercentages {
  stockSectors: Sector[]
  reitSectors: Sector[]
  bondsSectors: Sector[]
  internationalSectors: Sector[]
  cryptoSectors: Sector[]
  overviewSectors: Sector[]
}

export default function InvestmentPercentages({
  stockSectors,
  reitSectors,
  bondsSectors,
  internationalSectors,
  cryptoSectors,
  overviewSectors
}: IInvestmentPercentages) {
  const { authUser } = useAuth() as IAuthUserContext

  // Form values that will be saved to the Goals Firebase collection
  const defaultValues = {
    stocks: [{ name: '', value: '', id: '0' }],
    bonds: [{ name: '', value: '', id: '0' }],
    reits: [{ name: '', value: '', id: '0' }],
    international: [{ name: '', value: '', id: '0' }],
    overview: [{ name: '', value: '', id: '0' }],
    crypto: [{ name: '', value: '', id: '0' }]
  }

  const methods = useForm<GoalsForm>({
    defaultValues
  })

  const { sectors, removeDropdownItem, onAddNewDropdownItem } = useSectors(
    {
      stocks: stockSectors,
      reits: reitSectors,
      bonds: bondsSectors,
      international: internationalSectors,
      crypto: cryptoSectors,
      overview: overviewSectors
    },
    methods
  )

  const onSubmit = async (data: any) => {
    const goalsData = Object.keys(defaultValues).reduce(
      (acc: any, curr: string) => ({
        ...acc,
        [curr]: data[curr].map((asset: any) => ({
          id: asset.id,
          name: asset.name,
          value: asset.value
        }))
      }),
      {}
    )

    await setFirestoreGoalsData(goalsData, authUser.uid)
    alert('Dados salvos com sucesso!')
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const allItems = await getFirestoreGoals(authUser.uid)

        methods.reset({ ...defaultValues, ...allItems })
      } catch (error) {
        // TODO: Handle error, possibly show a user-friendly message
        console.error(error)
      }
    }

    getData()
  }, [])

  methods.watch()

  return (
    <S.MainSection>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <S.PercentagesTitle>
            Defina a parcela de investimento nos tipos de negócio:
          </S.PercentagesTitle>
          <AssetTypeTabContent
            tabsList={tabsList}
            defaultTab={{
              title: 'Porcentagens Gerais',
              name: 'overview'
            }}
          >
            {(activeTab: any) => {
              return (
                <AssetType
                  name={activeTab.name as AssetTypes}
                  dropdownItems={sectors[activeTab.name as AssetTypes]}
                  colors={COLORS}
                  onAddNewDropdownItem={onAddNewDropdownItem}
                  onRemoveDropdownItem={removeDropdownItem}
                ></AssetType>
              )
            }}
          </AssetTypeTabContent>
          <S.ButtonWrapper>
            <Button type="submit" text="Salvar" width="medium" />
          </S.ButtonWrapper>
        </form>
      </FormProvider>
    </S.MainSection>
  )
}

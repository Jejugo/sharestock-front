import React, { useEffect, useState, useMemo } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useAuth } from '@context/AuthUserContext'

import * as S from './styles'
import Button from '@components/Button/Button'
import { enqueueSnackbar } from 'notistack'
import TabContent from '@components/TabContent/TabContent'
import AssetType from './AssetType/AssetType'
import assetTypes from '@const/AssetTypes'
import { GoalsForm, GoalsFormAsset, Sector } from './interfaces'

import { getFirestoreGoals, setFirestoreGoalsData } from './requests'
import { useSectors } from './hooks/useSectors'
import Loading from '@components/Loading/Loading'

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

interface IInvestmentPercentages {
  stockSectors: Sector[]
  reitSectors: Sector[]
  bondsSectors: Sector[]
  internationalSectors: Sector[]
  cryptoSectors: Sector[]
  overviewSectors: Sector[]
}

const isTotalEqualTo100 = (items: Array<GoalsFormAsset>) => {
  const total = items.reduce(
    (acc, item) => acc + parseFloat(item.value || '0'),
    0
  )
  return total === 100
}

const hasEmptySectorNames = (items: Array<GoalsFormAsset>) =>
  items.some((item) => item.name === '')

export default function InvestmentPercentages({
  stockSectors,
  reitSectors,
  bondsSectors,
  internationalSectors,
  cryptoSectors,
  overviewSectors
}: IInvestmentPercentages) {
  const { authUser } = useAuth() as IAuthUserContext
  const [isLoading, setIsLoading] = useState(false)

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

  const tabsList = useMemo(
    () =>
      Object.values(assetTypes).filter((value) =>
        methods
          .getValues()
          .overview.some(
            (asset) =>
              asset.name === value.title ||
              value.title === 'Porcentagens Gerais'
          )
      ),
    [methods.getValues().overview]
  )

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

    const hasErrorOnSubmit = Object.keys(data).some(
      (key) =>
        !isTotalEqualTo100(data[key as keyof GoalsForm]) ||
        hasEmptySectorNames(data[key as keyof GoalsForm])
    )

    if (hasErrorOnSubmit) {
      enqueueSnackbar(
        'Os valores de todas as abas devem somar 100% respectivamente e os setores devem ser válidos',
        {
          variant: 'warning',
          preventDuplicate: true
        }
      )
      return
    }

    // If all validations pass, then save data
    await setFirestoreGoalsData(goalsData, authUser.uid)
    enqueueSnackbar('Dados salvos com sucesso!', {
      variant: 'success',
      preventDuplicate: true
    })
  }

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)
        const allItems = await getFirestoreGoals(authUser.uid)
        methods.reset({ ...allItems })
      } catch (error) {
        // TODO: Handle error, possibly show a user-friendly message
        console.error(error)
      } finally {
        setIsLoading(false)
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
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <TabContent
                tabsList={tabsList}
                defaultTab={{
                  title: 'Porcentagens Gerais',
                  name: 'overview'
                }}
              >
                {(activeTab: { title: string; name: string }) => {
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
              </TabContent>

              <S.ButtonWrapper>
                <Button type="submit" text="Salvar" width="medium" />
                <Button
                  text="Restaurar valores"
                  width="medium"
                  onClick={() => methods.reset()}
                />
              </S.ButtonWrapper>
            </>
          )}
        </form>
      </FormProvider>
    </S.MainSection>
  )
}

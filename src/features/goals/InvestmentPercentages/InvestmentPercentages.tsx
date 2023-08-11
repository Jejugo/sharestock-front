import React, { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useAuth } from 'context/AuthUserContext'

import * as S from './styles'
import Button from 'components/Button/Button'
import AssetTypeTabContent from './AssetTypeTabContent/AssetTypeTabContent'
import AssetType from './AssetType/AssetType'
import assetTypes from 'const/AssetTypes'
import { GoalsForm, Sector } from './interfaces'
import { v4 as uuidv4 } from 'uuid'

import {
  deleteDropdownItem,
  getFirestoreGoals,
  setFirestoreGoalsData,
  setNewDropdownItem
} from './requests'

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

export default function InvestmentPercentages({
  stockSectors,
  reitSectors,
  bondsSectors,
  internationalSectors,
  cryptoSectors,
  overviewSectors
}: IInvestmentPercentages) {
  const { authUser } = useAuth() as IAuthUserContext
  const defaultValues = {
    stocks: [{ name: '', value: '', id: 0, default: false }],
    bonds: [{ name: '', value: '', id: 0, default: false }],
    reits: [{ name: '', value: '', id: 0, default: false }],
    international: [{ name: '', value: '', id: 0, default: false }],
    overview: [{ name: '', value: '', id: 0, default: false }],
    crypto: [{ name: '', value: '', id: 0, default: false }]
  }

  const [currentStockSectors, setCurrentStockSectors] = useState(stockSectors)
  const [currentReitSectors, setCurrentReitSectors] = useState(reitSectors)
  const [currentBondSectors, setCurrentBondSectors] = useState(bondsSectors)
  const [currentInternationalSectors, setCurrentInternationalSectors] =
    useState(internationalSectors)
  const [currentCryptoSectors, setCurrentCryptoSectors] =
    useState(cryptoSectors)
  const [currentOverviewSectors, setCurrentOverviewSectors] =
    useState(overviewSectors)

  const [dropdownItems, setDropdownItems] = useState<any>({})

  const methods = useForm<GoalsForm>({
    defaultValues
  })

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

  const removeDropdownItem = async (id: string, name: string) => {
    try {
      await deleteDropdownItem({
        itemId: id,
        accessToken: authUser.accessToken,
        assetType: name
      })

      switch (name) {
        case 'stocks':
          setCurrentStockSectors((prevState: any) => [
            ...prevState.filter((item: any) => item.id !== id)
          ])
          break
        case 'reits':
          setCurrentReitSectors((prevState: any) => [
            ...prevState.filter((item: any) => item.id !== id)
          ])
          break
        case 'bonds':
          setCurrentBondSectors((prevState: any) => [
            ...prevState.filter((item: any) => item.id !== id)
          ])
          break
        case 'international':
          setCurrentInternationalSectors((prevState: any) => [
            ...prevState.filter((item: any) => item.id !== id)
          ])
          break
        case 'crypto':
          setCurrentCryptoSectors((prevState: any) => [
            ...prevState.filter((item: any) => item.id !== id)
          ])
          break
        default:
          setCurrentOverviewSectors((prevState: any) => [
            ...prevState.filter((item: any) => item.id !== id)
          ])
          break
      }
    } catch (err) {
      console.log('There was an error removing the dropdown item: ', err)
    }
  }

  const onAddNewDropdownItem = async (item: string, name: string) => {
    const uniqueId = uuidv4()
    const sector = {
      id: uniqueId,
      name: item,
      default: false
    }

    try {
      await setNewDropdownItem(uniqueId, item, name, authUser.accessToken)

      switch (name) {
        case 'stocks':
          setCurrentStockSectors((prevState: any) => [...prevState, sector])
          break
        case 'reits':
          setCurrentReitSectors((prevState: any) => [...prevState, sector])
          break
        case 'bonds':
          setCurrentBondSectors((prevState: any) => [...prevState, sector])
          break
        case 'international':
          setCurrentInternationalSectors((prevState: any) => [
            ...prevState,
            sector
          ])
          break
        case 'crypto':
          setCurrentCryptoSectors((prevState: any) => [...prevState, sector])
          break
        default:
          setCurrentOverviewSectors((prevState: any) => [...prevState, sector])
          break
      }
    } catch (err) {
      console.log('There was an error adding the item: ', err)
    }
  }

  useEffect(() => {
    setDropdownItems({
      stocks: currentStockSectors,
      reits: currentReitSectors,
      bonds: currentBondSectors,
      international: currentInternationalSectors,
      crypto: currentCryptoSectors,
      overview: currentOverviewSectors
    })
  }, [
    currentStockSectors,
    currentReitSectors,
    currentBondSectors,
    currentInternationalSectors,
    currentCryptoSectors,
    currentOverviewSectors
  ])

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
            tabsList={Object.keys(assetTypes).map((assetType) => assetType)}
            defaultTab="stocks"
          >
            {(activeTab: string) => (
              <AssetType
                name={assetTypes[activeTab].name}
                title={assetTypes[activeTab].title}
                dropdownItems={dropdownItems[activeTab]}
                colors={COLORS}
                onAddNewDropdownItem={onAddNewDropdownItem}
                onRemoveDropdownItem={removeDropdownItem}
              ></AssetType>
            )}
          </AssetTypeTabContent>
          <S.ButtonWrapper>
            <Button type="submit" text="Salvar" width="medium" />
          </S.ButtonWrapper>
        </form>
      </FormProvider>
    </S.MainSection>
  )
}

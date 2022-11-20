import React, { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useAuth } from 'context/AuthUserContext'
import Firestore from 'firebase/Firestore'
import OverviewPercentages from './Overview/OverviewPercentages'
import StockPercentages from './Stock/StockPercentages'
import ReitsPercentages from './Reits/ReitsPercentages'
import BondsPercentages from './Bonds/BondsPercentages'
import InternationalStocksPercentages from './InternationalStocks/InternationalStocksPercentages'

import * as S from './styles'

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
  const [defaultValues] = useState<GoalsForm>({
    stocks: [{ name: '', value: '', id: 0 }],
    bonds: [{ name: '', value: '', id: 0 }],
    reits: [{ name: '', value: '', id: 0 }],
    international: [{ name: '', value: '', id: 0 }],
    overview: [{ name: '', value: '', id: 0 }]
  })
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
          <StockPercentages sectors={sectors} />
          <ReitsPercentages />
          <BondsPercentages />
          <InternationalStocksPercentages />
          <OverviewPercentages />
          <S.ButtonWrapper>
            <S.SubmitButton type="submit">Salvar</S.SubmitButton>
          </S.ButtonWrapper>
        </form>
      </FormProvider>
    </S.MainSection>
  )
}

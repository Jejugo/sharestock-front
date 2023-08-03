import React from 'react'

import { FormProvider, useForm } from 'react-hook-form'
import initialFormValues, {
  IStategyFormAsset
} from 'features/strategy/StrategyForm/initialFormValues'
import StrategyTabContent from '../StrategyTabContent/StrategyTabContent'

type SupportedStrategy = 'stocks' | 'reits' | 'international'

function StrategyTabContentForm({
  tabName
}: {
  tabName: Omit<AssetTypes, 'overview'>
}) {
  const methods = useForm<IStategyFormAsset>({
    defaultValues: {
      [tabName.toString()]: initialFormValues[tabName as SupportedStrategy]
    }
  })

  const storeStatements = async (data: any) => {
    console.log('storing...', data)
  }

  const onSubmit = methods.handleSubmit((data) => storeStatements(data))

  return (
    <form onSubmit={onSubmit}>
      <FormProvider {...methods}>
        <StrategyTabContent
          tabName={tabName}
          onDeleteItem={() => new Promise((resolve) => resolve())}
        />
      </FormProvider>
    </form>
  )
}

export default React.memo(StrategyTabContentForm)

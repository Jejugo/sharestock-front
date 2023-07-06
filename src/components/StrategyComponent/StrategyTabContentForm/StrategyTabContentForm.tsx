import React from 'react'

import { FormProvider, useForm } from 'react-hook-form'
import initialFormValues, {
  IStategyFormAsset
} from 'features/strategy/StrategyForm/initialFormValues'
import StrategyTabContent from '../StrategyTabContent/StrategyTabContent'

function StrategyTabContentForm({ tabName }: { tabName: Partial<AssetTypes> }) {
  const methods = useForm<IStategyFormAsset>({
    defaultValues: {
      //@ts-ignore
      [tabName as keyof IStategyFormAsset]: initialFormValues[tabName]
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

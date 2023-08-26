import React from 'react'
import StrategyComponent from '@components/StrategyComponent/StrategyComponent'

import * as S from './styles'
import { FormProvider } from 'react-hook-form'
import useStrategyForm from './hooks/useStrategyForm'

export default function StrategyForm() {
  const { methods, onSubmit, onDeleteItem } = useStrategyForm()

  return (
    <S.StrategyForm>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <StrategyComponent onDeleteItem={onDeleteItem}></StrategyComponent>
        </FormProvider>
      </form>
    </S.StrategyForm>
  )
}

import React from 'react'
import StrategyComponent from '@features/strategy/StrategyComponent/StrategyComponent'

import * as S from './styles'
import { FormProvider } from 'react-hook-form'
import useStrategyForm from './hooks/useStrategyForm'
import Loading from '@components/Loading/Loading'

export default function StrategyForm() {
  const { methods, onSubmit, onDeleteItem, isLoading } = useStrategyForm()

  return (
    <S.StrategyForm>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          {isLoading && <Loading />}
          <StrategyComponent onDeleteItem={onDeleteItem}></StrategyComponent>
        </FormProvider>
      </form>
    </S.StrategyForm>
  )
}

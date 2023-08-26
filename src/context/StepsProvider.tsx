import React, { createContext, useContext, useState } from 'react'

import { stockShareAnalysis as steps } from '@const/definitions'

interface IStepsProvider {
  children: React.ReactNode
}

interface IStepsContext {
  count: number
  nextStep: () => void
  prevStep: () => void
}

const initialState: IStepsContext = {
  count: 0,
  nextStep: () => undefined,
  prevStep: () => undefined
}

export const StepsContext = createContext(initialState)

export const useStepsContext = () => useContext(StepsContext)

export const StepsProvider = ({ children }: IStepsProvider) => {
  const [count, setCount] = useState<number>(0)

  const nextStep = () => {
    const thereAreSteps = count < steps.length - 1
    if (thereAreSteps) setCount((previousState) => previousState + 1)
  }

  const prevStep = () => {
    if (count > 0) setCount((previousState) => previousState - 1)
  }

  return (
    <StepsContext.Provider value={{ count, nextStep, prevStep }}>
      {children}
    </StepsContext.Provider>
  )
}

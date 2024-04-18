import React, { createContext, useContext, useState } from 'react'
import { useAuth } from './AuthUserContext'

interface InvestContextProviderProps {
  children: React.ReactNode
}

interface IAssetStrategy {
  statements: IStatement[]
  selectedAsset: string
  quantity: string
}

interface IInvestContext {
  assetStrategy: IAssetStrategy
  setAssetStrategy: React.Dispatch<React.SetStateAction<IAssetStrategy>>
  onSubmit: (data: any) => void
}

const initialState: IInvestContext = {
  assetStrategy: {} as IAssetStrategy,
  setAssetStrategy: () => undefined,
  onSubmit: () => undefined
}

const InvestContext = createContext(initialState)

export const useInvestContext = () => useContext(InvestContext)

const InvestContextProvider = ({ children }: InvestContextProviderProps) => {
  const [assetStrategy, setAssetStrategy] = useState<IAssetStrategy>({
    statements: [],
    selectedAsset: '',
    quantity: ''
  } as IAssetStrategy)

  const onSubmit = async () => {
    alert('Data saved successfully')
  }

  return (
    <InvestContext.Provider
      value={{ onSubmit, assetStrategy, setAssetStrategy }}
    >
      {children}
    </InvestContext.Provider>
  )
}

export default InvestContextProvider

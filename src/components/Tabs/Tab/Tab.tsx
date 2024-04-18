import React from 'react'
import * as S from './Tab.style'
import { ITabsList } from '@features/goals/InvestmentPercentages/AssetTypeTabContent/AssetTypeTabContent'

// Define the type for the TabProps
interface TabProps {
  assetType: ITabsList
  activeTab: string
  onClick: () => void
}

// Create a Tab component
const Tab: React.FC<TabProps> = ({ assetType, activeTab, onClick }) => {
  return (
    <S.Tab active={activeTab === assetType[0]} onClick={onClick}>
      {assetType[1].title}
    </S.Tab>
  )
}

export default Tab

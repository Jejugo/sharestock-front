import React from 'react'
import Tab from './Tab/Tab'
import * as S from './Tabs.style'
import { ITabsList } from '@features/goals/InvestmentPercentages/AssetTypeTabContent/AssetTypeTabContent'

interface TabsProps {
  assetTypes: ITabsList[]
  activeTab: Partial<AssetTypes>
  setActiveTab: (assetType: Partial<AssetTypes>) => void
}

const Tabs: React.FC<TabsProps> = ({ assetTypes, activeTab, setActiveTab }) => {
  return (
    <S.TabsHeader>
      {assetTypes.map((assetType: ITabsList) => (
        <Tab
          key={assetType[0]}
          assetType={assetType}
          activeTab={activeTab}
          onClick={() => setActiveTab(assetType[0])}
        />
      ))}
    </S.TabsHeader>
  )
}

export default Tabs

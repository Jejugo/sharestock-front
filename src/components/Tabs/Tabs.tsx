import React from 'react'
import Tab from './Tab/Tab'
import * as S from './Tabs.style'

interface TabsProps {
  assetTypes: Partial<AssetTypes>[]
  activeTab: Partial<AssetTypes>
  setActiveTab: (assetType: Partial<AssetTypes>) => void
}

// Create a Tabs component
const Tabs: React.FC<TabsProps> = ({ assetTypes, activeTab, setActiveTab }) => {
  return (
    <div>
      <S.TabsHeader>
        {assetTypes.map((assetType: Partial<AssetTypes>) => (
          <Tab
            key={assetType}
            name={assetType}
            activeTab={activeTab}
            onClick={() => setActiveTab(assetType)}
          />
        ))}
      </S.TabsHeader>
    </div>
  )
}

export default Tabs

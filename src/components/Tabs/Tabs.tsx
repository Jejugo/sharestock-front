import React from 'react'
import Tab from './Tab/Tab'
import * as S from './Tabs.style'
import { IAssetTypesList } from '@const/AssetTypes'

interface TabsProps {
  assetTypes: IAssetTypesList[]
  activeTab: IAssetTypesList
  setActiveTab: React.Dispatch<React.SetStateAction<IAssetTypesList>>
}

const Tabs: React.FC<TabsProps> = ({ assetTypes, activeTab, setActiveTab }) => {
  console.log('assetTypes: ', assetTypes)

  return (
    <S.TabsHeader>
      {assetTypes.map((assetType: IAssetTypesList, index: number) => (
        <Tab
          key={index}
          assetType={assetType}
          activeTab={activeTab}
          onClick={() => setActiveTab(assetType)}
        />
      ))}
    </S.TabsHeader>
  )
}

export default Tabs

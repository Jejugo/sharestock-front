import React from 'react'
import * as S from './Tab.style'
import { IAssetTypesList } from '@const/AssetTypes'

// Define the type for the TabProps
interface TabProps {
  assetType: IAssetTypesList
  activeTab: IAssetTypesList
  onClick: () => void
}

// Create a Tab component
const Tab: React.FC<TabProps> = ({ assetType, activeTab, onClick }) => {
  return (
    <S.Tab active={activeTab.title === assetType.title} onClick={onClick}>
      {assetType.title}
    </S.Tab>
  )
}

export default Tab

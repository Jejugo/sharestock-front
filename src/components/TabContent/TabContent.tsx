import React, { useState } from 'react'
import Tabs from '@components/Tabs/Tabs'
import { IAssetTypesList } from '@const/AssetTypes'

export default function TabContent({
  defaultTab,
  tabsList,
  children
}: {
  defaultTab: IAssetTypesList
  tabsList: IAssetTypesList[]
  children: (activeTab: IAssetTypesList) => React.ReactElement
}) {
  const [activeTab, setActiveTab] = useState<IAssetTypesList>(defaultTab)

  return (
    <>
      <Tabs
        assetTypes={tabsList}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {children(activeTab)}
    </>
  )
}

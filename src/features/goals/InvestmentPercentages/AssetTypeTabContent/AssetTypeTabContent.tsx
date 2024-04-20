import React, { useState } from 'react'
import Tabs from '@components/Tabs/Tabs'
import { IAssetTypesList } from '@const/AssetTypes'

export default function AssetTypeTabContent({
  defaultTab,
  tabsList,
  children
}: {
  defaultTab?: IAssetTypesList
  tabsList: IAssetTypesList[]
  children: (activeTab: IAssetTypesList) => React.ReactElement
}) {
  const [activeTab, setActiveTab] = useState<IAssetTypesList>(
    defaultTab ?? {
      title: 'Ações',
      name: 'stocks'
    }
  )

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

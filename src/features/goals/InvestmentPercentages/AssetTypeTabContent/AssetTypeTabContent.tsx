import React, { useState } from 'react'
import Tabs from '@components/Tabs/Tabs'

export type ITabsList = [Partial<AssetTypes>, { name: string; title: string }]

export default function AssetTypeTabContent({
  defaultTab,
  tabsList,
  children
}: {
  defaultTab: Partial<AssetTypes> | 'Porcentagens Gerais'
  tabsList: ITabsList[]
  children: (activeTab: Partial<AssetTypes>) => React.ReactElement
}) {
  const [activeTab, setActiveTab] = useState<Partial<AssetTypes>>(
    defaultTab as Partial<AssetTypes>
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

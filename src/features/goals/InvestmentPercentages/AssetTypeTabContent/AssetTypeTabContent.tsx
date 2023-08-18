import React, { useState } from 'react'
import Tabs from 'components/Tabs/Tabs'

export default function AssetTypeTabContent({
  defaultTab,
  tabsList,
  children
}: {
  defaultTab: any
  tabsList: any[]
  children: (activeTab: Partial<AssetTypes>) => React.ReactElement
}) {
  const [activeTab, setActiveTab] = useState<Partial<AssetTypes>>(defaultTab)

  return (
    <>
      <Tabs
        assetTypes={tabsList.map((item) => item)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {children(activeTab)}
    </>
  )
}

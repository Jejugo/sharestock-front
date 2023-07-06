import React, { useRef } from 'react'

import AssetTypeTabContent from 'features/goals/InvestmentPercentages/AssetTypeTabContent/AssetTypeTabContent'
import assetTypes from 'const/AssetTypes'
import StrategyTabContent from './StrategyTabContent/StrategyTabContent'

export default function StrategyComponent({
  onDeleteItem
}: {
  onDeleteItem: (
    e: React.MouseEvent<HTMLElement>,
    index: number,
    statement: string,
    name: Partial<AssetTypes>
  ) => Promise<void>
}) {
  const tabsList = useRef(
    Object.keys(assetTypes)
      .map((assetType) => assetType)
      .filter((assetType) => assetType !== 'overview' && assetType !== 'bonds')
  )
  return (
    <section>
      <AssetTypeTabContent tabsList={tabsList.current} defaultTab="stocks">
        {(activeTab: Partial<AssetTypes>) => (
          <StrategyTabContent tabName={activeTab} onDeleteItem={onDeleteItem} />
        )}
      </AssetTypeTabContent>
    </section>
  )
}

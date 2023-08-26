import React, { useRef } from 'react'

import AssetTypeTabContent from '@features/goals/InvestmentPercentages/AssetTypeTabContent/AssetTypeTabContent'
import assetTypes from '@const/AssetTypes'
import StrategyTabContent from './StrategyTabContent/StrategyTabContent'

type SupportedAssets = 'stocks' | 'reits' | 'international'
export default function StrategyComponent({
  onDeleteItem
}: {
  onDeleteItem: (
    e: React.MouseEvent<HTMLElement>,
    index: number,
    statement: string,
    name: SupportedAssets
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
        {(activeTab: any) => (
          <StrategyTabContent tabName={activeTab} onDeleteItem={onDeleteItem} />
        )}
      </AssetTypeTabContent>
    </section>
  )
}

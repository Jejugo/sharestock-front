import React, { useRef } from 'react'

import AssetTypeTabContent from '@features/goals/InvestmentPercentages/AssetTypeTabContent/AssetTypeTabContent'
import assetTypes from '@const/AssetTypes'
import StrategyTabContent from './StrategyTabContent/StrategyTabContent'

type OnDeleteItem = (
  e: React.MouseEvent<HTMLElement>,
  index: number,
  statement: string,
  name: AssetTypes
) => Promise<void>

type StrategyComponentProps = {
  onDeleteItem: OnDeleteItem
}
export default function StrategyComponent({
  onDeleteItem
}: StrategyComponentProps) {
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

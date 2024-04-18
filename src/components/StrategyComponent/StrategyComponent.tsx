import React, { useRef } from 'react'

import AssetTypeTabContent from '@features/goals/InvestmentPercentages/AssetTypeTabContent/AssetTypeTabContent'
import assetTypes from '@const/AssetTypes'
import StrategyTabContent from './StrategyTabContent/StrategyTabContent'

type StrategyComponentProps = {
  onDeleteItem: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number,
    statement: string,
    name: 'stocks' | 'reits'
  ) => Promise<void>
}

const notSupportedStrategyAssets = [
  'bonds',
  'overview',
  'international',
  'crypto'
]

export type ITabsList = [Partial<AssetTypes>, { name: string; title: string }]

export default function StrategyComponent({
  onDeleteItem
}: StrategyComponentProps) {
  const tabsList = useRef(
    Object.entries(assetTypes).filter(
      (assetType) => !notSupportedStrategyAssets.includes(assetType[0])
    )
  )

  return (
    <section>
      <AssetTypeTabContent
        tabsList={tabsList.current as ITabsList[]}
        defaultTab="stocks"
      >
        {(activeTab: AssetTypes) => (
          <StrategyTabContent tabName={activeTab} onDeleteItem={onDeleteItem} />
        )}
      </AssetTypeTabContent>
    </section>
  )
}

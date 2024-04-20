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

const tabsList = Object.values(assetTypes).filter(
  (assetType) => !notSupportedStrategyAssets.includes(assetType.name)
)

export default function StrategyComponent({
  onDeleteItem
}: StrategyComponentProps) {
  return (
    <section>
      <AssetTypeTabContent
        tabsList={tabsList}
        defaultTab={{ title: 'Ações', name: 'stocks' }}
      >
        {(activeTab: any) => {
          console.log('activeTab: ', activeTab)

          return (
            <StrategyTabContent tab={activeTab} onDeleteItem={onDeleteItem} />
          )
        }}
      </AssetTypeTabContent>
    </section>
  )
}

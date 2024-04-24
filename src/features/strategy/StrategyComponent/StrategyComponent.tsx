import React, { useRef } from 'react'

import TabContent from '@components/TabContent/TabContent'
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
      <TabContent
        tabsList={tabsList}
        defaultTab={{ title: 'Ações', name: 'stocks' }}
      >
        {(activeTab: any) => {
          return (
            <StrategyTabContent tab={activeTab} onDeleteItem={onDeleteItem} />
          )
        }}
      </TabContent>
    </section>
  )
}

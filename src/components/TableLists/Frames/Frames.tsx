import React from 'react'

import FrameItem from './FrameItem/FrameItem'
import * as S from './styles'
interface FramesProps {
  filteredItems: (IStockItem | IReitItem)[]
  goToFundamentus: (share: IStockItem | IReitItem) => void
}

export default function Frames({
  filteredItems,
  goToFundamentus
}: FramesProps) {
  return (
    <S.FrameList id="share-data" className="list__shares">
      {filteredItems.map((item, index) => (
        <FrameItem key={index} item={item} goToFundamentus={goToFundamentus} />
      ))}
    </S.FrameList>
  )
}

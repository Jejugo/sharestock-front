import React from 'react'
import { Payload } from 'recharts/types/component/DefaultTooltipContent'
import { IStockSector } from './interfaces'
import * as S from './CustomTooltip.styles'
import { Tooltip } from 'recharts'

interface ICustomizedTooltip {
  payload: Payload<number, string>[]
  assetSectors: IStockSector[]
}

export default function CustomTooltip({
  payload,
  assetSectors
}: ICustomizedTooltip) {
  return (
    <S.ToolTip>
      <S.TooltipTitle>
        {`${((payload[0]?.value ?? 0) * 100).toFixed(2)}%`}
      </S.TooltipTitle>
      <S.TooltipList>
        {payload[0]?.name &&
          assetSectors?.map((sector: IStockSector, index: number) => {
            if (sector.sector === payload?.[0]?.name)
              return <li key={index}>{sector.name}</li>
            return null
          })}
      </S.TooltipList>
    </S.ToolTip>
  )
}

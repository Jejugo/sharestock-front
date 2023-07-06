import React from 'react'
import { Payload } from 'recharts/types/component/DefaultTooltipContent'
import { IStockSector } from './interfaces'
import * as S from './CustomTooltip.styles'

interface ICustomizedTooltip {
  payload: Payload<number, string>[]
  assetSectors: IStockSector[]
  decimals: number
}

export default function CustomTooltip({
  payload,
  decimals,
  assetSectors
}: ICustomizedTooltip) {
  return (
    <S.ToolTip>
      <S.TooltipTitle>
        {`${payload[0]?.name}`}
        <br />
        {`${((payload[0]?.value ?? 0) * 10 ** decimals).toFixed(2)}%`}
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

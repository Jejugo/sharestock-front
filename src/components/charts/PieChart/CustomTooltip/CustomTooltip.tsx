import React from 'react'
import { Payload } from 'recharts/types/component/DefaultTooltipContent'
import { IStockSector } from './interfaces'
import * as S from './CustomTooltip.styles'

interface ICustomizedTooltip {
  payload?: Payload<number, string>[]
  assetSectors: IStockSector[]
  decimals: number
  simpleAsset: boolean
}

export default function CustomTooltip({
  simpleAsset,
  payload,
  decimals,
  assetSectors
}: ICustomizedTooltip) {
  const capitalizedName =
    payload?.[0]?.name &&
    payload?.[0]?.name?.charAt(0).toUpperCase() + payload?.[0]?.name?.slice(1)

  return (
    <S.ToolTip>
      <S.TooltipTitle>
        {capitalizedName}
        <br />
        {simpleAsset
          ? `R$ ${payload?.[0]?.value}`
          : `${((payload?.[0]?.value ?? 0) * 10 ** decimals).toFixed(2)}%`}
        {simpleAsset && (
          <div>{`${
            parseFloat(payload?.[0]?.payload.percentage.toFixed(3)) * 10 ** 2
          }%`}</div>
        )}
      </S.TooltipTitle>
      <S.TooltipList>
        {payload?.[0]?.name &&
          assetSectors?.map((sector: IStockSector, index: number) => {
            if (sector.sector === payload?.[0]?.name)
              return <li key={index}>{sector.name}</li>
            return null
          })}
      </S.TooltipList>
    </S.ToolTip>
  )
}

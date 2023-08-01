import React, { useState, useEffect } from 'react'
import { Payload } from 'recharts/types/component/DefaultTooltipContent'
import * as S from './CustomTooltip.styles'
import { IBarData } from '../interfaces'

interface ICustomizedTooltip {
  payload?: Payload<number, string>[]
  decimals: number
  totalValue: number
}

export default function CustomTooltip({
  payload,
  decimals,
  totalValue
}: ICustomizedTooltip) {
  return (
    <S.ToolTip>
      <S.TooltipTitle>
        {`${payload?.[0]?.name}`}
        <br />
        {`R$${(payload?.[0]?.value ?? 0).toFixed(2)}`}
        <br />
        {payload?.[0]?.value
          ? `${((payload?.[0]?.value / totalValue) * 10 ** decimals).toFixed(
              2
            )}%`
          : null}
      </S.TooltipTitle>
      <S.TooltipList></S.TooltipList>
    </S.ToolTip>
  )
}

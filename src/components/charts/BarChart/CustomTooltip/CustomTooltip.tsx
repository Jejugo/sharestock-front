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
  const value = parseFloat((payload?.[0]?.value ?? 0).toFixed(2))

  return (
    <S.ToolTip>
      <S.TooltipTitle>
        {`${payload?.[0]?.name}`}
        <br />

        {value.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })}
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

import React from 'react'
import { Payload } from 'recharts/types/component/DefaultTooltipContent'
import * as S from './CustomTooltip.styles'
import { IBarData } from '@components/charts/BarChart/interfaces'

interface ICustomizedTooltip {
  payload?: Payload<number, string>[]
  decimals: number
  totalValue: number
  goalsData: IBarData[]
}

export default function CustomTooltip({
  payload,
  decimals,
  goalsData,
  totalValue
}: ICustomizedTooltip) {
  const selectedGoal = goalsData
    .find(
      (goal) => goal.name.toLowerCase() === payload?.[0]?.name?.toLowerCase()
    )
    ?.value.toString()

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
            )}% ${selectedGoal ? `(${selectedGoal}%)` : ''}`
          : null}
      </S.TooltipTitle>
      <S.TooltipList></S.TooltipList>
    </S.ToolTip>
  )
}

import React, { useMemo } from 'react'
import { IChartData } from '@components/charts/BarChart/interfaces'
import { Payload } from 'recharts/types/component/DefaultTooltipContent'
import Text from '@components/Text/Text'

import * as S from './CustomTooltip.styles'

type ICustomTooltipProps = {
  assetGoals: IChartData[]
  payload?: Payload<number, string>[]
  totalValue: number
}

const DECIMAL_PLACES = 2

export default function CustomTooltipGoals({
  assetGoals,
  payload,
  totalValue
}: ICustomTooltipProps) {
  const activePayload = payload?.[0]

  const getCapitalizedName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  const selectedGoal = useMemo(() => {
    return assetGoals
      .find(
        (goal) => goal.name.toLowerCase() === activePayload?.name?.toLowerCase()
      )
      ?.value.toString()
  }, [assetGoals, activePayload])

  const capitalizedName = useMemo(() => {
    return activePayload?.name ? getCapitalizedName(activePayload.name) : ''
  }, [activePayload])

  const formattedValue = useMemo(() => {
    return activePayload?.value
      ? activePayload.value.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      : ''
  }, [activePayload])

  const currentPercentage = useMemo(() => {
    if (selectedGoal && activePayload?.value) {
      return ((activePayload.value / totalValue) * 100).toFixed(DECIMAL_PLACES)
    }

    return 0
  }, [totalValue, formattedValue])

  const isBalanced = useMemo(() => {
    if (!selectedGoal || !currentPercentage) return false

    const goalDifference = Math.abs(
      parseFloat(selectedGoal) - parseFloat(currentPercentage)
    )
    return goalDifference <= 5
  }, [selectedGoal, currentPercentage])

  return (
    <S.ToolTip>
      <S.TooltipTitle>{capitalizedName}</S.TooltipTitle>
      <S.TooltipTextWrapper>
        <Text noMargin>
          <span>Valor Atual:</span> {formattedValue}
        </Text>
        <Text noMargin>
          <span>Porcentagem Atual:</span> {currentPercentage}%
        </Text>
        <Text noMargin>
          <span>
            Porcentagem Objetivo:
            <span
              style={{
                color: isBalanced ? 'green' : 'red',
                fontWeight: 'bold'
              }}
            >
              {selectedGoal}%
            </span>
          </span>
        </Text>
      </S.TooltipTextWrapper>
    </S.ToolTip>
  )
}

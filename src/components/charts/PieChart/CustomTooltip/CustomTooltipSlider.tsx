import React, { useMemo } from 'react'
import { Payload } from 'recharts/types/component/DefaultTooltipContent'
import { IAssetSector, IAssetGoal } from './interfaces'
import Text from '@components/Text/Text'
import * as S from './CustomTooltip.styles'

interface ICustomizedTooltip {
  payload?: Payload<number, string>[]
  assetSectors?: IAssetSector[]
  assetGoals: IAssetGoal[]
  simpleAsset: boolean
}

const DECIMAL_PLACES = 2

export default function CustomTooltip({
  simpleAsset,
  payload,
  assetGoals,
  assetSectors
}: ICustomizedTooltip) {
  const activePayload = payload?.[0]

  const getCapitalizedName = useMemo(() => {
    return (name: string) => name.charAt(0).toUpperCase() + name.slice(1)
  }, [])

  const selectedGoal = useMemo(() => {
    return (
      assetGoals
        .find(
          (goal) =>
            goal.name.toLowerCase() === activePayload?.name?.toLowerCase()
        )
        ?.value.toString() || 0
    )
  }, [assetGoals, activePayload])

  const capitalizedName = useMemo(() => {
    return activePayload?.name ? getCapitalizedName(activePayload.name) : ''
  }, [activePayload])

  const formattedValue = useMemo(() => {
    if (!activePayload?.value) return 0

    const percentage = activePayload.value * 100
    const currentPercentage = simpleAsset
      ? activePayload.payload.percentage * 100
      : percentage

    return currentPercentage
  }, [activePayload, simpleAsset])

  const goalDisplay = useMemo(() => {
    if (selectedGoal) {
      const valueDifference = Math.abs(
        formattedValue - parseFloat(selectedGoal)
      )
      const displayColor = valueDifference <= 5 ? 'green' : 'red'

      return (
        <span style={{ color: displayColor, fontWeight: 'bold' }}>
          {`${selectedGoal}%`}
        </span>
      )
    }

    return (
      <span
        style={{
          fontWeight: 'bold',
          color: Math.abs(formattedValue - 0) <= 5 ? 'green' : 'red'
        }}
      >{`0%`}</span>
    )
  }, [formattedValue, selectedGoal])

  const sectorItems = useMemo(() => {
    return assetSectors
      ?.map((sector, index) => {
        if (sector.sector === activePayload?.name) {
          return <li key={index}>{sector.name}</li>
        }
        return null
      })
      .filter(Boolean)
  }, [assetSectors, activePayload])

  return (
    <S.ToolTip>
      <S.TooltipTitle>{capitalizedName}</S.TooltipTitle>
      <S.TooltipTextWrapper>
        <Text noMargin>
          <span>Porcentagem Atual:</span> {formattedValue.toFixed(2)}%
        </Text>
        <Text noMargin>
          <span>Porcentagem Objetivo: {goalDisplay}</span>
        </Text>
      </S.TooltipTextWrapper>
      {assetSectors && <S.TooltipList>{sectorItems}</S.TooltipList>}
    </S.ToolTip>
  )
}

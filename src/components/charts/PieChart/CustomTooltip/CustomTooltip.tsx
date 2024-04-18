import React from 'react'
import { Payload } from 'recharts/types/component/DefaultTooltipContent'
import { IAssetSector, IAssetGoal } from './interfaces'
import * as S from './CustomTooltip.styles'

interface ICustomizedTooltip {
  payload?: Payload<number, string>[]
  assetSectors: IAssetSector[]
  assetGoals: IAssetGoal[]
  decimals: number
  simpleAsset: boolean
}

export default function CustomTooltip({
  simpleAsset,
  payload,
  decimals,
  assetGoals,
  assetSectors
}: ICustomizedTooltip) {
  const selectedGoal = assetGoals
    .find(
      (goal) => goal.name.toLowerCase() === payload?.[0]?.name?.toLowerCase()
    )
    ?.value.toString()

  const capitalizedName =
    payload?.[0]?.name &&
    payload?.[0]?.name.charAt(0).toUpperCase() + payload?.[0]?.name.slice(1)

  const formattedValue = simpleAsset
    ? `${payload?.[0]?.value?.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })} `
    : `${((payload?.[0]?.value ?? 0) * 10 ** decimals).toFixed(2)}% `

  const goalDisplay = selectedGoal && (
    <span style={{ color: 'green' }}>{`(${selectedGoal}%)`}</span>
  )

  const assetPercentage = simpleAsset && (
    <div>{`${
      parseFloat(payload?.[0]?.payload.percentage.toFixed(3)) * 10 ** 2
    }%`}</div>
  )

  return (
    <S.ToolTip>
      <S.TooltipTitle>
        {capitalizedName}
        <br />
        {formattedValue}
        {goalDisplay}
        {assetPercentage}
      </S.TooltipTitle>
      <S.TooltipList>
        {payload?.[0]?.name &&
          assetSectors?.map((sector: IAssetSector, index: number) => {
            if (sector.sector === payload?.[0]?.name)
              return <li key={index}>{sector.name}</li>
            return null
          })}
      </S.TooltipList>
    </S.ToolTip>
  )
}

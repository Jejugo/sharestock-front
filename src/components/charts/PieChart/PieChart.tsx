import React, { useState } from 'react'
import { Cell, Legend, Pie, PieChart } from 'recharts'

import * as S from './styles'
import { IPieData } from './interfaces'

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#9999ff',
  '#d6aa7f',
  '#a45a52',
  '#36c90e',
  '#cc3333',
  '#fbbaf7',
  '#82a8f4'
]

interface IPieChart {
  data: IPieData[]
  children?: React.ReactNode
}

const PieChartComponent = ({ data, children: toolTip }: IPieChart) => {
  const [filteredNames, setFilteredNames] = useState<string[]>([])
  const handlePieClick = (data: any) => {
    console.log('clicked', data)
  }

  const filteredData = data.map((asset) => {
    if (filteredNames.length) {
      return filteredNames.includes(asset.name)
        ? asset
        : {
            ...asset,
            value: 0
          }
    }
    return asset
  })

  const handleLegend = (val: any) => {
    if (filteredNames.includes(val.value)) {
      return setFilteredNames((previousState) => {
        return previousState.filter(
          (filteredName) => filteredName !== val.value
        )
      })
    }
    setFilteredNames((previousState) => [...previousState, val.value])
  }

  const formatLegend = (val: string) => {
    return filteredNames.includes(val) ? (
      <b>{val}</b>
    ) : (
      <span style={{ color: 'grey' }}>{val}</span>
    )
  }

  return (
    <>
      {data.length ? (
        <S.ResponsiveContainerMargin width="70%" height="100%">
          <PieChart>
            <Legend
              height={36}
              iconType="circle"
              iconSize={10}
              onClick={handleLegend}
              formatter={formatLegend}
              layout="vertical"
              verticalAlign="top"
              align="right"
            />
            <Pie
              onClick={handlePieClick}
              dataKey="value"
              isAnimationActive={true}
              data={filteredData}
              fill="#8884d8"
            >
              {data.map((entry: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            {toolTip}
          </PieChart>
        </S.ResponsiveContainerMargin>
      ) : null}
    </>
  )
}

export default PieChartComponent

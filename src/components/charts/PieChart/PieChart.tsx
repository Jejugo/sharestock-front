import React, { useState } from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts'

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
  width?: string
  height?: string
  showLegend?: boolean
  children?: React.ReactNode
}

const PieChartComponent = ({
  data,
  children: tooltip,
  width = '100%',
  height = '100%',
  showLegend = true
}: IPieChart) => {
  const [filteredNames, setFilteredNames] = useState<string[]>([])
  const handlePieClick = () => {
    // TODO: do something when clicking on Pie
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
        <ResponsiveContainer width={width} height={height}>
          <PieChart>
            {showLegend && (
              <Legend
                iconType="circle"
                iconSize={10}
                onClick={handleLegend}
                formatter={formatLegend}
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{ lineHeight: '30px' }}
              />
            )}
            <Pie
              onClick={handlePieClick}
              dataKey="value"
              isAnimationActive={true}
              data={filteredData}
              fill="#8884d8"
              outerRadius="100%"
            >
              {data.map((entry: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            {tooltip}
          </PieChart>
        </ResponsiveContainer>
      ) : null}
    </>
  )
}

export default PieChartComponent

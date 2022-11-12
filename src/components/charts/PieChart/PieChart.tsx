import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

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
  children: React.ReactNode
}

const PieChartComponent = ({ data, children: toolTip }: IPieChart) => {
  const handlePieClick = (data: any) => {
    console.log('clicked', data)
  }

  const handleLabel = (entry: any) => entry.name

  return (
    <>
      {data.length ? (
        <ResponsiveContainer width={1200} height={500}>
          <PieChart width={600} height={600}>
            <Pie
              onClick={handlePieClick}
              dataKey="value"
              isAnimationActive={true}
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label={handleLabel}
              style={{ fontWeight: '600' }}
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
        </ResponsiveContainer>
      ) : null}
    </>
  )
}

export default PieChartComponent

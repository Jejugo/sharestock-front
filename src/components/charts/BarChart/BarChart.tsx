import React from 'react'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

import { IBarData } from './interfaces'

interface IBarChart {
  data: IBarData[]
  children?: React.ReactNode
  size?: {
    height: number
    width: number
  }
  barColor: string
}

export default function BarCharComponent({
  data,
  children: tooltip,
  barColor
}: IBarChart) {
  return (
    <ResponsiveContainer width="50%" height={300}>
      <BarChart
        width={200}
        height={100}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="value" fill={barColor} />
        {tooltip}
      </BarChart>
    </ResponsiveContainer>
  )
}

import { ResponsiveContainer } from 'recharts'
import styled from 'styled-components'

export interface IResponsiveContainerMargin {
  width: number
  height: number
}

export const ResponsiveContainerMargin = styled(ResponsiveContainer)`
  margin: 20px auto;
`

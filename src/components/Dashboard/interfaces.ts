export interface RecommendedPercentages {
  [key: string]: {
    name: string
    percentage: string
    points: number
  }
}

export interface IStockSector {
  name: string
  sector: string
  value: number
}

export interface IPieData {
  name: string
  value: number
}

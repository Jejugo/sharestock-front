export interface ISliderMap {
  title: string
  goals: {
    id: string
    name: string
    value: number
  }[]
  data: {
    name: string
    value: number
  }[]
  sectors: {
    name: string
    sector: string
    value: number
  }[]
}

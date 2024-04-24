export interface Sector {
  id: string
  name: string
  default: boolean
}

export interface Option {
  id: string
  name: string
  showDeleteIcon: boolean
}

export interface GoalsFormAsset {
  name: string
  value: string
  id: string
  default?: boolean
}
export interface GoalsForm {
  stocks: { name: string; value: string; id: string; default: boolean }[]
  bonds: { name: string; value: string; id: string; default: boolean }[]
  reits: { name: string; value: string; id: string; default: boolean }[]
  international: { name: string; value: string; id: string; default: boolean }[]
  overview: { name: string; value: string; id: string; default: boolean }[]
  crypto: { name: string; value: string; id: string; default: boolean }[]
}

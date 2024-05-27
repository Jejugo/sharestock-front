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
  stocks: GoalsFormAsset[]
  bonds: GoalsFormAsset[]
  reits: GoalsFormAsset[]
  international: GoalsFormAsset[]
  overview: GoalsFormAsset[]
  crypto: GoalsFormAsset[]
}

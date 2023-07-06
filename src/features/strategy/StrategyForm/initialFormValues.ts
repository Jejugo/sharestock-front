export interface IStategyFormAsset {
  statement: string
  weight: string
  statements: IStatement[]
}

export interface IStrategyForm {
  stocks: IStategyFormAsset
  reits: IStategyFormAsset
  international: IStategyFormAsset & {
    type: string
  }
}

export type TabName =
  | 'stocks'
  | 'reits'
  | 'international'
  | 'overview'
  | 'bonds'

const initialFormState: IStrategyForm = {
  stocks: {
    statement: '',
    weight: '',
    statements: []
  },
  reits: {
    statement: '',
    weight: '',
    statements: []
  },
  international: {
    type: '',
    statement: '',
    weight: '',
    statements: []
  }
}

export default initialFormState

export interface IStategyFormAsset {
  defaultValues: FormAsset
}

export interface FormAsset {
  statement: string
  weight: string
  statements: IStatement[]
}

export interface IStrategyForm {
  stocks: FormAsset
  reits: FormAsset
  international: FormAsset & {
    type: string
  }
  bonds: FormAsset & {
    type: string
  }
  overview: FormAsset
  crypto: FormAsset
}

export type TabName =
  | 'stocks'
  | 'reits'
  | 'international'
  | 'overview'
  | 'bonds'

const initialFormState: Partial<IStrategyForm> = {
  stocks: {
    statement: '',
    weight: '',
    statements: [] as IStatement[]
  },
  reits: {
    statement: '',
    weight: '',
    statements: [] as IStatement[]
  },
  international: {
    type: '',
    statement: '',
    weight: '',
    statements: [] as IStatement[]
  }
}

export default initialFormState

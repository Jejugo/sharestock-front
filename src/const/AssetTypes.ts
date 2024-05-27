export type IAssetTypesList = {
  name: string
  title: string
  dropdownItems?: string[]
}

export interface IAssetTypes {
  [key: string]: IAssetTypesList
}

export type IAssetsObject = [
  Partial<AssetTypes>,
  { name: string; title: string }
]

export default {
  overview: {
    name: 'overview',
    title: 'Porcentagens Gerais'
  },
  stocks: {
    name: 'stocks',
    title: 'Ações'
  },
  reits: {
    name: 'reits',
    title: 'Fundos Imobiliários'
  },
  international: {
    name: 'international',
    title: 'Internacional'
  },
  bonds: {
    name: 'bonds',
    title: 'Renda Fixa'
  },
  crypto: {
    name: 'crypto',
    title: 'Criptomoedas'
  }
} as IAssetTypes

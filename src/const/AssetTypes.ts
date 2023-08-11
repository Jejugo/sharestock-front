interface IAssetTypes {
  [key: string]: {
    name: string
    title: string
    dropdownItems?: string[]
  }
}

export default {
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
    title: 'Ativos Internacionais'
  },
  bonds: {
    name: 'bonds',
    title: 'Renda Fixa'
  },
  crypto: {
    name: 'crypto',
    title: 'Crypto'
  },
  overview: {
    name: 'overview',
    title: 'Porcentagens Gerais'
  }
} as IAssetTypes

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
    title: 'Ativos Internacionais',
    dropdownItems: [
      'Medical ETF',
      'Games ETF',
      'Dividends ETF',
      'S&P ETF',
      'Treasury',
      'Reits',
      'Stocks'
    ]
  },
  bonds: {
    name: 'bonds',
    title: 'Renda Fixa',
    dropdownItems: [
      'Selic Futuro',
      'Selic Presente',
      'Tesouro Prefixado',
      'CDB',
      'LCI',
      'LCA',
      'CRI'
    ]
  },
  overview: {
    name: 'overview',
    title: 'Porcentagens Gerais',
    dropdownItems: [
      'Ações',
      'Fundos Imobiliarios',
      'Renda Fixa',
      'Internacional'
    ]
  }
} as IAssetTypes

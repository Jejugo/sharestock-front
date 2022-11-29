export default [
  { name: 'stocks', title: 'Ações' },
  {
    name: 'reits',
    title: 'Fundos Imobiliários',
    dropdownItems: ['tijolo', 'papel']
  },
  {
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
  {
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
  {
    name: 'overview',
    title: 'Porcentagens Gerais',
    dropdownItems: [
      'Ações',
      'Fundos Imobiliarios',
      'Renda Fixa',
      'Internacional'
    ]
  }
]

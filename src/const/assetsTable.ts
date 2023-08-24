import { ITableColumn } from 'components/AssetTable/interfaces'

export const columnsNames: ITableColumn[] = [
  { id: 'type', label: 'Tipo', minWidth: 50 },
  { id: 'asset', label: 'Nome', minWidth: 50 },
  {
    id: 'symbol',
    label: 'Símbolo',
    minWidth: 50
  },
  {
    id: 'currentValue',
    label: 'Valor Atual',
    minWidth: 50,
    align: 'left',
    format: (value: number) => `R$${value.toLocaleString('pt-BR')}`
  },
  {
    id: 'recommendedValue',
    label: 'Valor Recomendado',
    minWidth: 50,
    align: 'left',
    format: (value: number) => `R$${value.toLocaleString('pt-BR')}`
  },
  {
    id: 'adjustment',
    label: 'Ajuste',
    minWidth: 50,
    align: 'left'
  },
  {
    id: 'total',
    label: 'Carteira (%)',
    minWidth: 50,
    align: 'left',
    format: (value: number) => `${(value * 100).toFixed(2)}%`
  },
  {
    id: 'recommended',
    label: 'Recomendado (%)',
    minWidth: 50,
    align: 'left',
    format: (value: number) => `${(value * 100).toFixed(2)}%`
  },
  {
    id: 'grade',
    label: 'Nota',
    minWidth: 50,
    align: 'left',
    format: (value: number) => value.toFixed(2)
  },
  {
    id: 'quantity',
    label: 'Quantidade',
    minWidth: 50,
    align: 'left',
    format: (value: number) => value
  },
  {
    id: 'cheapStockScore',
    label: 'Price Check',
    minWidth: 50,
    align: 'left',
    format: (value: number) => value
  }
]

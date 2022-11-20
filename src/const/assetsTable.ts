import { ITableColumn } from 'components/AssetTable/interfaces'

export const columnsNames: ITableColumn[] = [
  { id: 'asset', label: 'Ação', minWidth: 50 },
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
    format: (value: number) => value.toFixed(2)
  },
  { id: 'recommended', label: 'Recomendado (%)', minWidth: 50, align: 'left' },
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
  }
]

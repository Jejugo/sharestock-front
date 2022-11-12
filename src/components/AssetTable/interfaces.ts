export interface ITableRow {
  symbol: string
  asset: string
  recommended: string
  currentValue: number
  recommendedValue: number
  adjustment: string
  grade: number
  total: string
  quantity: number
  cheapStockScore: number
}

export interface ITableColumn {
  id: string
  label: string
  minWidth: number
  align?: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined
  format?: (value: number) => string | number
}

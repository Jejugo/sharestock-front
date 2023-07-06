export interface ITableRow {
  type: AssetTypes
  symbol: string
  asset: string
  recommended: number
  currentValue: number
  recommendedValue: number
  isBalanced: boolean
  adjustment: string
  grade: number
  total: number
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

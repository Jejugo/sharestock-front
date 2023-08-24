import { cheapRow } from './cheapRow'
import { ITableColumn, ITableRow } from '../interfaces'

// value is good if the difference is less than 1000
export const isValueGood = (currentValue: number, recommendedValue: number) =>
  recommendedValue >= currentValue
    ? recommendedValue - currentValue <= 1000
    : recommendedValue - currentValue >= -1000

export const isCheapStock = (score: number): string => cheapRow[score]

export const getTextColor = (column: ITableColumn, row: ITableRow): string => {
  if (column.id === 'currentValue') {
    return row.isBalanced ? 'green' : 'red'
  }
  return 'white'
}

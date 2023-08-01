import { ITableRow } from '../interfaces'
import { cheapRow } from './cheapRow'

// value is good if the difference is less than 1000
export const isValueGood = (currentValue: number, recommendedValue: number) =>
  recommendedValue >= currentValue
    ? recommendedValue - currentValue <= 1000
    : recommendedValue - currentValue >= -1000

export const isCheapStock = (score: number): string => cheapRow[score]

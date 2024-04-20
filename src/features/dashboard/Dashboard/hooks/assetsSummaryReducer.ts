import { IStockSector } from '../interfaces'
import { AssetsSummary } from './useAssetsSummary'

export const assetsSummaryReducer = (
  prevState: AssetsSummary,
  action: {
    type: string
    payload?: AssetsSummary
  }
) => {
  switch (action.type) {
    case 'INITIALIZE_DATA':
      return {
        ...prevState,
        stockSectors: [] as IStockSector[],
        reitsSectors: [] as IStockSector[],
        bondsSectors: [] as any,
        internationalSectors: [] as any,
        cryptoSectors: [] as any,
        stockPieChartData: [{ name: '', value: 0 }],
        reitPieChartData: [{ name: '', value: 0 }],
        bondsPieData: [{ name: '', value: 0 }],
        internationalPieData: [{ name: '', value: 0 }],
        cryptoPieData: [{ name: '', value: 0 }]
      }
    case 'SET_DATA':
      return {
        ...prevState,
        ...action.payload
      }
    default:
      return prevState
  }
}

import React, { useEffect, useState } from 'react'
import { columnsNames } from 'const/assetsTable'
import {
  calculateTotalUserAssetsValue,
  getAllUserAssets,
  getAssetStrategy
} from 'firebase/utils'
import calculateAssetPoints from 'builders/calculateAssetPoints'
import { convertArrayToObject } from 'builders/arrays'
import { buildAssetTableData } from 'builders/assets'
import { useAuth } from 'context/AuthUserContext'
import calculateAssetPercentages, {
  AssetPercentage
} from 'builders/calculateAssetPercentages'
import { RecommendedPercentages } from 'features/dashboard/Dashboard/interfaces'
import { ITableColumn, ITableRow } from 'components/AssetTable/interfaces'

export default function useAssetTableData() {
  const { authUser } = useAuth()
  const [rows, setRows] = useState<ITableRow[]>([])
  const [columns, setColumns] = useState<ITableColumn[]>([])

  useEffect(() => {
    const getUserAssets = async () => {
      if (authUser) {
        const [assets, assetStrategy] = await Promise.all([
          getAllUserAssets(authUser),
          getAssetStrategy(authUser)
        ])
        if (Object.keys(assetStrategy).length) {
          const assetPoints: IWalletResistancePoints =
            await calculateAssetPoints(assetStrategy)
          const assetRecommendedPercentages =
            calculateAssetPercentages(assetPoints)

          const recommendedPercentages = convertArrayToObject<AssetPercentage>(
            assetRecommendedPercentages,
            'name'
          ) as RecommendedPercentages
          const totalValue = calculateTotalUserAssetsValue(assets)

          const tableData: ITableRow[] = Object.keys(assets)
            .map((item: string) =>
              buildAssetTableData({
                assets,
                item,
                recommendedPercentages,
                totalValue,
                assetPoints
              })
            )
            .sort((a, b) =>
              a.asset < b.asset ? -1 : a.asset > b.asset ? 1 : 0
            ) //alphabetically

          setRows(tableData)
          setColumns(columnsNames)
        }
      }
    }
    getUserAssets().catch((err) => {
      console.error(
        `There was an error getting the user Assets: ${err.message} `
      )
    })
  }, [])
  return {
    rows,
    columns
  }
}

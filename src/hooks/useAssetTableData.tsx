import React, { useEffect, useState } from 'react'
import { columnsNames } from '@const/assetsTable'
import {
  calculateTotalUserAssetsValue,
  getAllUserAssets,
  getUserAssetStatements
} from 'firebase/utils'
import calculateAssetPoints from 'builders/calculateAssetPoints'
import { convertArrayToObject, convertObjectKeysToList } from 'builders/arrays'
import { buildAssetTableData } from 'builders/assetTable'
import { useAuth } from '@context/AuthUserContext'
import calculateAssetPercentages, {
  AssetPercentage
} from '@builders/calculateAssetPercentages'
import { RecommendedPercentages } from '@components/Dashboard/interfaces'
import { ITableColumn, ITableRow } from '@components/AssetTable/interfaces'

export default function useAssetTableData() {
  const { authUser } = useAuth()
  const [rows, setRows] = useState<ITableRow[]>([])
  const [columns, setColumns] = useState<ITableColumn[]>([])

  useEffect(() => {
    const getUserAssets = async () => {
      if (authUser) {
        const [userAssets, userAssetStatements] = await Promise.all([
          getAllUserAssets(authUser),
          getUserAssetStatements(authUser)
        ])
        if (Object.keys(userAssetStatements).length) {
          const assetPoints: IWalletResistancePoints =
            await calculateAssetPoints(userAssetStatements)
          const assetRecommendedPercentages =
            calculateAssetPercentages(assetPoints)

          const recommendedPercentages = convertArrayToObject<AssetPercentage>(
            assetRecommendedPercentages,
            'name'
          ) as RecommendedPercentages
          const totalValue = calculateTotalUserAssetsValue(userAssets)

          const tableData: ITableRow[] = Object.keys(userAssets)
            .map((item: string) =>
              buildAssetTableData({
                userAssets,
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

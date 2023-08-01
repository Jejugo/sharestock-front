import { useEffect, useState } from 'react'
import { columnsNames } from 'const/assetsTable'
import { ITableColumn, ITableRow } from 'components/AssetTable/interfaces'
import config from '../configs'
import axios from 'axios'

const { SHARE_API } = config

export default function useAssetTableData(
  shouldRefetch = false,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>> = () => null
) {
  const [rows, setRows] = useState<ITableRow[]>([])
  const [columns, setColumns] = useState<ITableColumn[]>([])

  useEffect(() => {
    const getUserAssets = async () => {
      setIsLoading(true)
      const { items } = await axios
        .get(SHARE_API + '/user/recommendation')
        .then((res) => res.data)

      setRows([
        ...items.stocks.tableData,
        ...items.reits.tableData,
        ...items.bonds.tableData,
        ...items.international.tableData
      ])

      setColumns(columnsNames)
    }
    getUserAssets()
      .catch((err) => {
        console.error(
          `There was an error getting the user Assets: ${err.message} `
        )
      })
      .finally(() => setIsLoading(false))
  }, [shouldRefetch])
  return {
    rows,
    columns
  }
}

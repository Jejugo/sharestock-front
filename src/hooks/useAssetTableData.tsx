import { useEffect, useState } from 'react'
import { columnsNames } from 'const/assetsTable'
import { useAuth } from 'context/AuthUserContext'
import { ITableColumn, ITableRow } from 'components/AssetTable/interfaces'
import config from '../configs'
import axios from 'axios'

const { SHARE_API } = config

export default function useAssetTableData() {
  const { authUser } = useAuth()
  const [rows, setRows] = useState<ITableRow[]>([])
  const [columns, setColumns] = useState<ITableColumn[]>([])

  useEffect(() => {
    const getUserAssets = async () => {
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

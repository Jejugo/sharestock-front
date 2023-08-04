import { useEffect, useState } from 'react'
import { columnsNames } from 'const/assetsTable'
import { ITableColumn, ITableRow } from 'components/AssetTable/interfaces'
import axios from 'axios'
import { useAuth } from 'context/AuthUserContext'

export default function useAssetTableData(
  shouldRefetch = false,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>> = () => null
) {
  const [rows, setRows] = useState<ITableRow[]>([])
  const [columns, setColumns] = useState<ITableColumn[]>([])
  const { authUser } = useAuth()

  console.log('ENVIRONMENT: ', process.env)

  useEffect(() => {
    const getUserAssets = async () => {
      setIsLoading(true)
      const { items } = await axios
        .get(
          process.env.NEXT_PUBLIC_SHARE_API +
            `/user/recommendation/${authUser.uid}`
        )
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

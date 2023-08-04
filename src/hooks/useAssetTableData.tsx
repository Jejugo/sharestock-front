import { useEffect, useState } from 'react'
import { columnsNames } from 'const/assetsTable'
import { ITableColumn, ITableRow } from 'components/AssetTable/interfaces'
import axios from 'axios'
import { useAuth } from 'context/AuthUserContext'
import useSWR from 'swr'

const domain = process.env.NEXT_PUBLIC_SHARE_API

const fetcher = (url: string, options: RequestInit) =>
  fetch(`${domain}${url}`, options).then((res: Response) => res.json())

export default function useAssetTableData(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>> = () => null
) {
  const [rows, setRows] = useState<ITableRow[]>([])
  const [columns, setColumns] = useState<ITableColumn[]>([])
  const { authUser } = useAuth()

  const { data, isLoading, mutate } = useSWR(
    `/user/recommendation/${authUser.uid}`,
    fetcher
  )

  useEffect(() => setIsLoading(isLoading), [isLoading])

  useEffect(() => {
    if (data) {
      setIsLoading(true)

      const { items } = data

      setRows([
        ...items.stocks.tableData,
        ...items.reits.tableData,
        ...items.bonds.tableData,
        ...items.international.tableData
      ])

      setColumns(columnsNames)
      setIsLoading(false)
    }
  }, [data])

  return {
    rows,
    columns,
    mutate
  }
}

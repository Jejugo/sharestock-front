import { useEffect, useMemo, useState } from 'react'
import { columnsNames } from '@const/columns'
import { ITableColumn, ITableRow } from '@components/AssetTable/interfaces'
import { useAuth } from '@context/AuthUserContext'
import useSWR from 'swr'

const domain = process.env.NEXT_PUBLIC_SHARE_API

interface FetcherArgs {
  url: string
  token: string
}

const fetcher = ({ url, token }: FetcherArgs) => {
  return fetch(`${domain}${url}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }).then((res: Response) => res.json())
}

export default function useAssetTableData() {
  const [rows, setRows] = useState<ITableRow[]>([])
  const [columns, setColumns] = useState<ITableColumn[]>([])
  const { authUser } = useAuth()
  const [loading, setLoading] = useState(false)

  const { data, isLoading, mutate } = useSWR(
    {
      url: '/user/recommendation',
      token: authUser.accessToken
    },
    fetcher
  )

  const filterRowsByType = (type: string) => {
    return rows.filter((item) => item?.type === type)
  }

  const stocks = useMemo(() => filterRowsByType('stocks'), [rows])
  const reits = useMemo(() => filterRowsByType('reits'), [rows])
  const bonds = useMemo(() => filterRowsByType('bonds'), [rows])
  const international = useMemo(() => filterRowsByType('international'), [rows])
  const crypto = useMemo(() => filterRowsByType('crypto'), [rows])

  const refreshData = async () => {
    setLoading(true) // Set loading true before re-fetch
    await mutate() // Await ensures we wait for re-fetch to complete
    setLoading(false) // Set loading false after re-fetch
  }

  useEffect(() => {
    if (data && data.items) {
      const allRows = Object.values(data.items)
        .flatMap((item: any) => item.tableData)
        .filter((a) => a)

      setRows(allRows)
      setColumns(columnsNames)
    }
  }, [data])

  return {
    isLoading: loading || isLoading,
    allRows: rows,
    stocks,
    reits,
    bonds,
    international,
    crypto,
    columns,
    refreshData
  }
}

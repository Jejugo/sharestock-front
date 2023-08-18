import { useEffect, useState } from 'react'
import { columnsNames } from 'const/assetsTable'
import { ITableColumn, ITableRow } from 'components/AssetTable/interfaces'
import { useAuth } from 'context/AuthUserContext'
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

export default function useAssetTableData(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>> = () => null
) {
  const [rows, setRows] = useState<ITableRow[]>([])
  const [columns, setColumns] = useState<ITableColumn[]>([])
  const { authUser } = useAuth()

  const { data, isLoading, mutate } = useSWR(
    {
      url: '/user/recommendation',
      token: authUser.accessToken
    },
    fetcher
  )

  useEffect(() => setIsLoading(isLoading), [isLoading])

  useEffect(() => {
    if (data) {
      setIsLoading(true)

      const { items } = data

      setRows([
        ...(items.stocks?.tableData || []),
        ...(items.reits?.tableData || []),
        ...(items.bonds?.tableData || []),
        ...(items.international?.tableData || []),
        ...(items.crypto?.tableData || [])
      ])

      setColumns(columnsNames)
      setIsLoading(false)
    }
  }, [data])

  const stocks = (rows.filter((item) => item.type === 'stocks') ||
    []) as ITableRow[]
  const reits = (rows.filter((item) => item.type === 'reits') ||
    []) as ITableRow[]
  const bonds = (rows.filter((item) => item.type === 'bonds') ||
    []) as ITableRow[]
  const international = (rows.filter((item) => item.type === 'international') ||
    []) as ITableRow[]
  const crypto = (rows.filter((item) => item.type === 'crypto') ||
    []) as ITableRow[]

  return {
    allRows: rows,
    stocks,
    reits,
    bonds,
    international,
    crypto,
    columns,
    mutate
  }
}

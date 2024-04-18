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

  const filterRowsByType = (type: string) => {
    return useMemo(() => rows.filter((item) => item?.type === type), [rows])
  }

  useEffect(() => {
    setIsLoading(isLoading)
  }, [isLoading])

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
    allRows: rows,
    stocks: filterRowsByType('stocks'),
    reits: filterRowsByType('reits'),
    bonds: filterRowsByType('bonds'),
    international: filterRowsByType('international'),
    crypto: filterRowsByType('crypto'),
    columns,
    mutate
  }
}

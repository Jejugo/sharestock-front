import React from 'react'
import Template from '@layout/Template/Template'
import DashboardComponent from '@features/dashboard/Dashboard/Dashboard'
import { convertArrayToObject } from '@builders/arrays'
interface IAssetObject<T> {
  [key: string]: T
}
interface IDashboard {
  sharesMap: IAssetObject<IStockItem>
  reitsMap: IAssetObject<IReitItem>
  bondsMap: IAssetObject<{
    value: number
  }>
  internationalAssetsMap: IAssetObject<{
    value: number
  }>
}

export default function Dashboard({ sharesMap, reitsMap }: IDashboard) {
  return (
    <Template tabTitle="dashboard">
      <DashboardComponent
        sharesMap={sharesMap}
        reitsMap={reitsMap}
      ></DashboardComponent>
    </Template>
  )
}

export async function getServerSideProps(context: any) {
  const accessToken = context.req.cookies.accessToken

  const authorization = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }

  try {
    const [shares, reits] = await Promise.all([
      await fetch(`${process.env.NEXT_PUBLIC_SHARE_API}/shares`, {
        ...authorization
      }),
      await fetch(`${process.env.NEXT_PUBLIC_SHARE_API}/reits`, {
        ...authorization
      })
    ])

    const { items: sharesList } = await shares.json()

    const sharesMap = convertArrayToObject(sharesList as IStockItem[], 'papel')

    const { items: reitsList } = await reits.json()
    const reitsMap = convertArrayToObject(reitsList as IStockItem[], 'papel')

    return {
      props: {
        sharesMap,
        reitsMap
      }
    }
  } catch (err) {
    console.error(err)
    return {
      props: {
        sharesMap: {},
        reitsMap: {}
      }
    }
  }
}

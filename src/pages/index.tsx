import React from 'react'
import Template from 'layout/Template/Template'
import DashboardComponent from 'features/dashboard/Dashboard/Dashboard'
import { convertArrayToObject } from 'builders/arrays'
interface IArrayToObject<T> {
  [key: string]: T
}
interface IDashboard {
  sharesMap: IArrayToObject<IStockItem>
  reitsMap: IArrayToObject<IReitItem>
  bondsMap: IArrayToObject<{
    value: number
  }>
  internationalAssetsMap: IArrayToObject<{
    value: number
  }>
}

export default function Dashboard({
  sharesMap,
  reitsMap,
  bondsMap,
  internationalAssetsMap
}: IDashboard) {
  return (
    <Template tabTitle="dashboard">
      <DashboardComponent
        sharesMap={sharesMap}
        reitsMap={reitsMap}
        bondsMap={bondsMap}
        internationalAssetsMap={internationalAssetsMap}
      ></DashboardComponent>
    </Template>
  )
}

export async function getServerSideProps(context: any) {
  const acessToken = context.req.cookies.accessToken

  const authorization = {
    headers: {
      Authorization: `Bearer ${acessToken}`
    }
  }

  const [shares, reits, bonds, international] = await Promise.all([
    await fetch(`${process.env.NEXT_PUBLIC_SHARE_API}/shares`, {
      ...authorization
    }),
    await fetch(`${process.env.NEXT_PUBLIC_SHARE_API}/reits`, {
      ...authorization
    }),
    await fetch(`${process.env.NEXT_PUBLIC_SHARE_API}/bonds`, {
      ...authorization
    }),
    await fetch(`${process.env.NEXT_PUBLIC_SHARE_API}/international/assets`, {
      ...authorization
    })
  ])

  const { items: sharesList } = (await shares.json()) as IStockItemResponse
  const sharesMap = convertArrayToObject(sharesList as IStockItem[], 'papel')

  const { items: reitsList } = (await reits.json()) as IStockItemResponse
  const reitsMap = convertArrayToObject(reitsList as IStockItem[], 'papel')

  const { items: bondsList } = (await bonds.json()) as IStockItemResponse

  const { items: internationalList } =
    (await international.json()) as IStockItemResponse

  return {
    props: {
      sharesMap,
      reitsMap,
      bondsMap: bondsList[0],
      internationalAssetsMap: internationalList[0]
    }
  }
}

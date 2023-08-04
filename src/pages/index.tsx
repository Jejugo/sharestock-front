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

export async function getServerSideProps() {
  const shares = await fetch(`${process.env.NEXT_PUBLIC_SHARE_API}/shares`)
  const { items: sharesList } = (await shares.json()) as IStockItemResponse
  const sharesMap = convertArrayToObject(sharesList as IStockItem[], 'papel')

  const reits = await fetch(`${process.env.NEXT_PUBLIC_SHARE_API}/reits`)
  const { items: reitsList } = (await reits.json()) as IStockItemResponse
  const reitsMap = convertArrayToObject(reitsList as IStockItem[], 'papel')

  const bonds = await fetch(`${process.env.NEXT_PUBLIC_SHARE_API}/bonds`)
  const { items: bondsList } = (await bonds.json()) as IStockItemResponse

  const international = await fetch(
    `${process.env.NEXT_PUBLIC_SHARE_API}/international/assets`
  )
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

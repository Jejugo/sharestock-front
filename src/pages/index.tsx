import React from 'react'
import Template from '../skeleton/Template/Template'
import DashboardComponent from '../components/Dashboard/Dashboard'
import { convertArrayToObject } from '@builders/arrays'
import config from '../configs'

const { SHARE_API } = config

interface IArrayToObject<T> {
  [key: string]: T
}
interface IDashboard {
  sharesMap: IArrayToObject<IStockItem>
}

export default function Dashboard({ sharesMap }: IDashboard) {
  return (
    <section className="dashboard">
      <Template tabTitle={'dashboard'}>
        <DashboardComponent sharesMap={sharesMap}></DashboardComponent>
      </Template>
    </section>
  )
}

export async function getServerSideProps() {
  const data = await fetch(`${SHARE_API}/shares/all`)
  const { items: sharesList } = (await data.json()) as IStockItemResponse
  const sharesMap = convertArrayToObject(sharesList as IStockItem[], 'Papel')
  return {
    props: {
      sharesMap,
      sharesList
    }
  }
}

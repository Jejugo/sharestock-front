import React from 'react'
import Template from '../skeleton/Template/Template'
import InvestComponent from '../components/InvestComponent/InvestComponent'
import config from '../configs'
import {
  convertArrayToObject,
  normalizeArrayToDropdown
} from '../builders/arrays'

const { SHARE_API } = config

interface IDropdownItem {
  value: string
  label: string
}

interface IArrayToObject<T> {
  [key: string]: T
}

interface IInvest {
  dropdownShares: IDropdownItem[]
  sharesMap: IArrayToObject<IStockItem>
}

export default function Invest({ dropdownShares, sharesMap }: IInvest) {
  return (
    <section className="dashboard">
      <Template tabTitle={'dashboard'}>
        <InvestComponent
          dropdownShares={dropdownShares}
          sharesMap={sharesMap}
        ></InvestComponent>
      </Template>
    </section>
  )
}

export async function getServerSideProps() {
  const data = await fetch(`${SHARE_API}/shares/all`)
  const { items: shareList } = (await data.json()) as IStockItemResponse
  const dropdownShares = normalizeArrayToDropdown(shareList as IStockItem[])
  const sharesMap = convertArrayToObject(shareList as IStockItem[], 'Papel')

  return {
    props: {
      dropdownShares,
      sharesMap
    }
  }
}

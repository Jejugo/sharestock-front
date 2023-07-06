import React from 'react'
import Template from '../layout/Template/Template'
import InvestComponent from 'features/invest/InvestComponent/InvestComponent'
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
    <Template tabTitle="balance">
      <InvestComponent
        dropdownShares={dropdownShares}
        sharesMap={sharesMap}
      ></InvestComponent>
    </Template>
  )
}

export async function getServerSideProps() {
  const data = await fetch(`${SHARE_API}/shares`)
  const { items: shareList } = (await data.json()) as IStockItemResponse
  const dropdownShares = normalizeArrayToDropdown(shareList as IStockItem[])
  const sharesMap = convertArrayToObject(shareList as IStockItem[], 'papel')

  return {
    props: {
      dropdownShares,
      sharesMap
    }
  }
}

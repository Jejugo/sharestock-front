import React from 'react'
import Template from 'layout/Template/Template'
import config from 'configs'

import MyAssetsComponent from 'features/my-assets/MyAssets/MyAssetsComponent'
import {
  convertArrayToObject,
  normalizeArrayToDropdown
} from '../builders/arrays'
const { SHARE_API } = config

interface IArrayToObject<T> {
  [key: string]: T
}
interface IMyAssets {
  shareList: IStockItem[]
  dropdownShares: IDropdownItem[]
  sharesMap: IArrayToObject<IStockItem>
}

const MyAssets = ({ dropdownShares, sharesMap }: IMyAssets) => {
  return (
    <Template tabTitle="My Assets">
      <MyAssetsComponent
        dropdownShares={dropdownShares}
        sharesMap={sharesMap}
      />
    </Template>
  )
}

export async function getServerSideProps() {
  const data = await fetch(`${SHARE_API}/shares`)
  const { items: shareList } = (await data.json()) as IStockItemResponse

  const sharesMap = convertArrayToObject(shareList as IStockItem[], 'papel')
  const dropdownShares = normalizeArrayToDropdown(shareList as IStockItem[])

  return {
    props: {
      sharesMap,
      dropdownShares
    }
  }
}

export default MyAssets

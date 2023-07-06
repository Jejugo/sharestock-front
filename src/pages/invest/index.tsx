import React from 'react'
import Template from 'layout/Template/Template'

import MyAssetsComponent from 'features/my-assets/MyAssets/MyAssetsComponent'

interface IArrayToObject<T> {
  [key: string]: T
}
interface IMyAssets {
  shareList: IStockItem[]
  dropdownList: IDropdownList
  sharesMap: IArrayToObject<IStockItem>
}

const MyAssets = ({ dropdownList, sharesMap }: IMyAssets) => {
  return (
    <Template tabTitle="My Assets">
      <MyAssetsComponent />
    </Template>
  )
}

export default MyAssets

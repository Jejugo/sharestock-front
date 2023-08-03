import React, { useEffect, useRef, useState } from 'react'

import { useAuth } from '../../../context/AuthUserContext'

import assetTypes from 'const/AssetTypes'
import MyAssetsForm from 'features/my-assets/MyAssets/MyAssetsForm/MyAssetsForm'
import axios from 'axios'
import config from '../../../configs'
import Template from 'layout/Template/Template'
import Tabs from 'components/Tabs/Tabs'
import Router from 'next/router'
import InvestContextProvider from 'context/InvestContext'
import { convertArrayToObject, normalizeArrayToDropdown } from 'builders/arrays'

const { SHARE_API } = config

interface IArrayToObject<T> {
  [key: string]: T
}
interface IAddAssets {
  setShowAddAsset: React.Dispatch<React.SetStateAction<boolean>>
  dropdownList: IDropdownList
  reitsMap: IArrayToObject<IReitItem>
}
interface ISelectedAsset {
  value: string
  label: string
}

export default function StockInvest({ reitsMap, dropdownList }: IAddAssets) {
  const { authUser } = useAuth() as IAuthUserContext
  const [assetStrategyData, setAssetStrategyData] = useState([] as any)

  const assetTypesList = Object.keys(assetTypes)
    .map((assetType) => assetType)
    .filter((assetType) => assetType !== 'overview') as Partial<AssetTypes>[]

  useEffect(() => {
    const getAssetsFromFirebase = async () => {
      if (authUser) {
        const data = await axios
          .get(SHARE_API + `/user/strategy/${authUser.uid}`)
          .then((res) => res.data.items[0])

        console.log('setting strategy reits', data)
        setAssetStrategyData(data)
      }
    }

    getAssetsFromFirebase().catch((err) =>
      console.log('error while grabbing strategies from firebase', err)
    )
  }, [])

  return (
    <Template tabTitle="Invest Reits">
      <Tabs
        assetTypes={assetTypesList}
        activeTab="reits"
        setActiveTab={(tabName) => Router.push(`/invest/${tabName}`)}
      />
      <InvestContextProvider>
        <MyAssetsForm
          assetMap={reitsMap}
          tabName="reits"
          dropdownList={dropdownList}
          assetStrategyData={assetStrategyData}
        />
      </InvestContextProvider>
    </Template>
  )
}

export async function getServerSideProps() {
  try {
    const reitsData = await fetch(`${SHARE_API}/reits`)

    const reitsList = await reitsData.json()

    const reitItems = reitsList.items

    const reitsMap = convertArrayToObject(reitItems as IReitItem[], 'papel')

    const dropdownReits = normalizeArrayToDropdown(reitItems as IReitItem[])

    return {
      props: {
        reitsMap: reitsMap,
        dropdownList: dropdownReits
      }
    }
  } catch (error) {
    console.log('There was an error fetching the data', error)

    return {
      props: {
        reitsMap: {},
        dropdownList: []
      }
    }
  }
}

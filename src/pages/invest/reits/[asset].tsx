import React, { useEffect, useState } from 'react'

import { useAuth } from '@context/AuthUserContext'

import assetTypes from '@const/AssetTypes'
import MyAssetsForm from '@features/my-assets/MyAssets/MyAssetsForm/MyAssetsForm'
import axios from 'axios'
import Template from '@layout/Template/Template'
import Tabs from '@components/Tabs/Tabs'
import Router, { useRouter } from 'next/router'
import InvestContextProvider from '@context/InvestContext'
import {
  convertArrayToObject,
  normalizeArrayToDropdown
} from '@builders/arrays'

interface IArrayToObject<T> {
  [key: string]: T
}
interface IAddAssets {
  setShowAddAsset: React.Dispatch<React.SetStateAction<boolean>>
  dropdownList: IDropdownItem[]
  reitsMap: IArrayToObject<IReitItem>
}

const tabsList = Object.values(assetTypes).filter(
  (assetType) => assetType.name === 'stocks' || assetType.name === 'reits'
)

export default function StockInvest({ reitsMap, dropdownList }: IAddAssets) {
  const { authUser } = useAuth() as IAuthUserContext
  const [assetStrategyData, setAssetStrategyData] = useState([] as any)
  const router = useRouter()
  const { asset } = router.query

  useEffect(() => {
    const getAssetsFromFirebase = async () => {
      if (authUser) {
        const data = await axios
          .get(process.env.NEXT_PUBLIC_SHARE_API + '/user/strategy', {
            headers: {
              Authorization: `Bearer ${authUser.accessToken}`
            }
          })
          .then((res) => res.data.items)

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
        assetTypes={tabsList}
        activeTab={{ title: 'Fundos Imobiliários', name: 'reits' }}
        setActiveTab={(tab) => Router.push(`/invest/${tab.name}`)}
      />
      <InvestContextProvider>
        <MyAssetsForm
          assetMap={reitsMap}
          asset={asset}
          tabName="reits"
          dropdownList={dropdownList}
          assetStrategyData={assetStrategyData}
        />
      </InvestContextProvider>
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

  try {
    const reitsData = await fetch(
      `${process.env.NEXT_PUBLIC_SHARE_API}/reits`,
      { ...authorization }
    )
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

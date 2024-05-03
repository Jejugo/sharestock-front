import React, { useEffect, useState } from 'react'

import { useAuth } from '@context/AuthUserContext'

import assetTypes from '@const/AssetTypes'
import MyAssetsForm from '@features/my-assets/MyAssets/MyAssetsForm/MyAssetsForm'
import axios from 'axios'
import Template from '@layout/Template/Template'
import { convertArrayToObject } from '@builders/arrays'
import { normalizeArrayToDropdown } from '@builders/arrays'
import Tabs from '@components/Tabs/Tabs'
import Router from 'next/router'
import InvestContextProvider from '@context/InvestContext'

interface IArrayToObject<T> {
  [key: string]: T
}
interface IAddAssets {
  dropdownList: IDropdownItem[]
  stockMap: IArrayToObject<IStockItem>
}

const tabsList = Object.values(assetTypes).filter(
  (assetType) => assetType.name !== 'overview'
)

export default function StockInvest({ stockMap, dropdownList }: IAddAssets) {
  const { authUser } = useAuth() as IAuthUserContext
  const [assetStrategyData, setAssetStrategyData] = useState([] as any)

  useEffect(() => {
    const getAssetsFromFirebase = async () => {
      if (authUser) {
        const data = await axios
          .get(`${process.env.NEXT_PUBLIC_SHARE_API}/user/strategy`, {
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
  }, [authUser])

  return (
    <Template tabTitle="Invest Stocks">
      <Tabs
        assetTypes={tabsList}
        activeTab={{ title: 'Ações', name: 'stocks' }}
        setActiveTab={(tab) => Router.push(`/invest/${tab.name}`)}
      />
      <InvestContextProvider>
        <MyAssetsForm
          tabName="stocks"
          assetMap={stockMap}
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
    const sharesData = await fetch(
      `${process.env.NEXT_PUBLIC_SHARE_API}/shares`,
      { ...authorization }
    )

    const stockList = await sharesData.json()

    const stockItems = stockList.items

    const stockMap = convertArrayToObject(stockItems as IReitItem[], 'papel')
    const dropdownStocks = normalizeArrayToDropdown(stockItems as IReitItem[])

    return {
      props: {
        stockMap: stockMap,
        dropdownList: dropdownStocks
      }
    }
  } catch (error) {
    console.log('There was an error fetching the data', error)

    return {
      props: {
        sharesMap: {},
        dropdownList: []
      }
    }
  }
}

import React from 'react'

import assetTypes from 'const/AssetTypes'
import MyAssetsForm from 'features/my-assets/MyAssets/MyAssetsForm/MyAssetsForm'
import Template from 'layout/Template/Template'
import Tabs from 'components/Tabs/Tabs'
import Router from 'next/router'
import InvestContextProvider from 'context/InvestContext'
import { Sector } from 'features/goals/InvestmentPercentages/interfaces'

interface IAddAssets {
  dropdownCrypto: IDropdownList
}

export default function InternationInvest({ dropdownCrypto }: IAddAssets) {
  const assetTypesList = Object.keys(assetTypes)
    .map((assetType) => assetType)
    .filter((assetType) => assetType !== 'overview') as Partial<AssetTypes>[]

  return (
    <Template tabTitle="Invest Crypto">
      <Tabs
        assetTypes={assetTypesList}
        activeTab="crypto"
        setActiveTab={(tabName) => Router.push(`/invest/${tabName}`)}
      />
      <InvestContextProvider>
        <MyAssetsForm tabName="crypto" dropdownList={dropdownCrypto} />
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
    const cryptoData = await fetch(
      `${process.env.NEXT_PUBLIC_SHARE_API}/crypto/sectors`,
      { ...authorization }
    )
    const cryptoList = await cryptoData.json()

    const cryptoItems = cryptoList.items.crypto

    const dropdownCrypto = cryptoItems.map((item: Sector) => ({
      value: item.name.toLowerCase(),
      label: item.name
    }))

    return {
      props: {
        dropdownCrypto
      }
    }
  } catch (error) {
    console.log('There was an error fetching the data', error)

    return {
      props: {
        dropdownCrypto: []
      }
    }
  }
}

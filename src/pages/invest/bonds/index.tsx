import React from 'react'

import assetTypes from '@const/AssetTypes'
import MyAssetsForm from '@features/my-assets/MyAssets/MyAssetsForm/MyAssetsForm'
import Template from '@layout/Template/Template'
import Tabs from '@components/Tabs/Tabs'
import Router from 'next/router'
import InvestContextProvider from '@context/InvestContext'

interface IAddAssets {
  dropdownBonds: IDropdownList
}

export default function StockInvest({ dropdownBonds }: IAddAssets) {
  const assetTypesList = Object.keys(assetTypes)
    .map((assetType) => assetType)
    .filter((assetType) => assetType !== 'overview') as Partial<AssetTypes>[]

  return (
    <Template tabTitle="Invest Bonds">
      <Tabs
        assetTypes={assetTypesList}
        activeTab="bonds"
        setActiveTab={(tabName) => Router.push(`/invest/${tabName}`)}
      />
      <InvestContextProvider>
        <MyAssetsForm tabName="bonds" dropdownList={dropdownBonds} />
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
    const bondsData = await fetch(
      `${process.env.NEXT_PUBLIC_SHARE_API}/bonds/sectors`,
      { ...authorization }
    )
    const bondsList = await bondsData.json()

    const bondItems = bondsList.items

    const dropdownBonds = bondItems.map((item: string) => ({
      value: item.toLowerCase(),
      label: item
    }))

    return {
      props: {
        dropdownBonds
      }
    }
  } catch (error) {
    console.log('There was an error fetching the data', error)

    return {
      props: {
        dropdownBonds: []
      }
    }
  }
}

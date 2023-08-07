import React from 'react'

import assetTypes from 'const/AssetTypes'
import MyAssetsForm from 'features/my-assets/MyAssets/MyAssetsForm/MyAssetsForm'
import Template from 'layout/Template/Template'
import Tabs from 'components/Tabs/Tabs'
import Router from 'next/router'
import InvestContextProvider from 'context/InvestContext'

interface IAddAssets {
  dropdownInternational: IDropdownList
}

export default function InternationInvest({
  dropdownInternational
}: IAddAssets) {
  const assetTypesList = Object.keys(assetTypes)
    .map((assetType) => assetType)
    .filter((assetType) => assetType !== 'overview') as Partial<AssetTypes>[]

  return (
    <Template tabTitle="Invest International">
      <Tabs
        assetTypes={assetTypesList}
        activeTab="international"
        setActiveTab={(tabName) => Router.push(`/invest/${tabName}`)}
      />
      <InvestContextProvider>
        <MyAssetsForm
          tabName="international"
          dropdownList={dropdownInternational}
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
    const internationalData = await fetch(
      `${process.env.NEXT_PUBLIC_SHARE_API}/international/sectors`,
      { ...authorization }
    )
    const internationalList = await internationalData.json()

    const bondItems = internationalList.items

    const dropdownInternational = bondItems.map((item: string) => ({
      value: item.toLowerCase(),
      label: item
    }))

    return {
      props: {
        dropdownInternational
      }
    }
  } catch (error) {
    console.log('There was an error fetching the data', error)

    return {
      props: {
        dropdownInternational: []
      }
    }
  }
}

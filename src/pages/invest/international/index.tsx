import React from 'react'
import assetTypes from '@const/AssetTypes'
import MyAssetsForm from '@features/my-assets/MyAssets/MyAssetsForm/MyAssetsForm'
import Template from '@layout/Template/Template'
import Tabs from '@components/Tabs/Tabs'
import Router from 'next/router'
import InvestContextProvider from '@context/InvestContext'

interface IAddAssets {
  dropdownInternational: IDropdownItem[]
}

const tabsList = Object.values(assetTypes).filter(
  (assetType) => assetType.name !== 'overview'
)

export default function InternationInvest({
  dropdownInternational
}: IAddAssets) {
  return (
    <Template tabTitle="Investir Internacional">
      <Tabs
        assetTypes={tabsList}
        activeTab={{ title: 'Internacional', name: 'international' }}
        setActiveTab={(tab) => Router.push(`/invest/${tab.name}`)}
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
  try {
    const acessToken = context.req.cookies.accessToken

    const authorization = {
      headers: {
        Authorization: `Bearer ${acessToken}`
      }
    }

    const internationalData = await fetch(
      `${process.env.NEXT_PUBLIC_SHARE_API}/international/sectors`,
      { ...authorization }
    )
    const internationalList = await internationalData.json()

    const {
      items: { international: internationalItems }
    } = internationalList

    const dropdownInternational = internationalItems.map(
      (item: IDropdownItem) => ({
        value: item.name && item.name.toLowerCase(),
        label: item.name && item.name
      })
    )

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

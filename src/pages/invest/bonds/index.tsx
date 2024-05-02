import React from 'react'
import assetTypes from '@const/AssetTypes'
import MyAssetsForm from '@features/my-assets/MyAssets/MyAssetsForm/MyAssetsForm'
import Template from '@layout/Template/Template'
import Tabs from '@components/Tabs/Tabs'
import Router from 'next/router'
import InvestContextProvider from '@context/InvestContext'

interface IAddAssets {
  dropdownBonds: IDropdownItem[]
}

const tabsList = Object.values(assetTypes).filter(
  (assetType) => assetType.name !== 'overview'
)

export default function BondsInvest({ dropdownBonds }: IAddAssets) {
  return (
    <Template tabTitle="Investir Renda Fixa">
      <Tabs
        assetTypes={tabsList}
        activeTab={{ title: 'Renda Fixa', name: 'bonds' }}
        setActiveTab={(tab) => Router.push(`/invest/${tab.name}`)}
      />
      <InvestContextProvider>
        <MyAssetsForm tabName="bonds" dropdownList={dropdownBonds} />
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

    const bondsData = await fetch(
      `${process.env.NEXT_PUBLIC_SHARE_API}/bonds/sectors`,
      { ...authorization }
    )
    const bondsList = await bondsData.json()

    const bondItems = bondsList.items

    const dropdownBonds = bondItems.map((item: any) => ({
      value: item && item.toLowerCase(),
      label: item && item
    }))

    console.log('bonds: ', bondItems)

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

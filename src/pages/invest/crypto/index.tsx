import React from 'react'
import assetTypes from '@const/AssetTypes'
import MyAssetsForm from '@features/my-assets/MyAssets/MyAssetsForm/MyAssetsForm'
import Template from '@layout/Template/Template'
import Tabs from '@components/Tabs/Tabs'
import Router from 'next/router'
import InvestContextProvider from '@context/InvestContext'

interface IAddAssets {
  dropdownCrypto: IDropdownItem[]
}

const tabsList = Object.values(assetTypes).filter(
  (assetType) => assetType.name !== 'overview'
)

export default function CryptoInvest({ dropdownCrypto }: IAddAssets) {
  return (
    <Template tabTitle="Investir Criptomoedas">
      <Tabs
        assetTypes={tabsList}
        activeTab={{ title: 'Criptomoedas', name: 'crypto' }}
        setActiveTab={(tab) => Router.push(`/invest/${tab.name}`)}
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

    const dropdownCrypto = cryptoItems.map((item: any) => ({
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

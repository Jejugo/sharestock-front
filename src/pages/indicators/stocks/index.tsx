import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import TableToggle from '@features/indicators/TableToggle/TableToggle'
import SearchBar from '@components/SearchBar/SearchBar'
import Template from '@layout/Template/Template'
import WishListPopUp from '@features/indicators/WishListPopUp/WishListPopUp'
import WishListProvider from '@context/WishList'
import { tableColumnsStocks } from '@features/indicators/constants'
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary'
import config from '../../../configs'
import assetTypes from '@const/AssetTypes'
import Tabs from '@components/Tabs/Tabs'

const { STATUS_INVEST_HOST } = config

interface IndicatorsProps {
  shares: IStockItem[]
  goodShares: IStockItem[]
}

const tabsList = Object.values(assetTypes).filter(
  (assetType) => assetType.name === 'stocks' || assetType.name === 'reits'
)

const Indicators = ({ shares, goodShares }: IndicatorsProps) => {
  const [search, setSearch] = useState<string>('')
  const [isGoodShares, setIsGoodShares] = useState<boolean>(false)

  const setSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toUpperCase())
  }

  const goToFundamentus = (share: string) => {
    const router = Router
    router.push(`${STATUS_INVEST_HOST}/acoes/${share.toLowerCase()}`)
  }

  return (
    <Template tabTitle="all-shares">
      <ErrorBoundary>
        <Tabs
          assetTypes={tabsList}
          activeTab={{ title: 'Ações', name: 'stocks' }}
          setActiveTab={(tab) => Router.push(`/indicators/${tab.name}`)}
        />
        <SearchBar
          setSearchText={setSearchText}
          value={search}
          placeholder="Ativo"
        ></SearchBar>
        <WishListProvider>
          <TableToggle
            columns={tableColumnsStocks}
            assets={isGoodShares ? goodShares : shares}
            value={search}
            setIsGoodAsset={setIsGoodShares}
            isGoodAsset={isGoodShares}
            goToFundamentus={goToFundamentus}
          ></TableToggle>
          <WishListPopUp></WishListPopUp>
        </WishListProvider>
      </ErrorBoundary>
    </Template>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const acessToken = context.req.cookies.accessToken

  const authorization = {
    headers: {
      Authorization: `Bearer ${acessToken}`
    }
  }

  try {
    const shares = await fetch(`${process.env.NEXT_PUBLIC_SHARE_API}/shares`, {
      ...authorization
    })
    const goodShares = await fetch(
      `${process.env.NEXT_PUBLIC_SHARE_API}/shares?optimized=true`,
      { ...authorization }
    )
    const { items: sharesItems } = (await shares.json()) as IStockItemResponse
    const { items: goodSharesItems } =
      (await goodShares.json()) as IStockItemResponse

    return {
      props: {
        shares: sharesItems,
        goodShares: goodSharesItems
      }
    }
  } catch (error) {
    console.log('There was an error grabbing data from firestore: ', error)
    return {
      props: {
        shares: [],
        goodShares: []
      }
    }
  }
}

export default Indicators

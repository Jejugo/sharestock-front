import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import TableToggle from '@features/indicators/TableToggle/TableToggle'
import SearchBar from '@components/SearchBar/SearchBar'

import Template from '@layout/Template/Template'
import WishListPopUp from '@features/indicators/WishListPopUp/WishListPopUp'
import WishListProvider from '@context/WishList'
import { tableColumnsReits } from '@features/indicators/constants'

import config from '../../../configs'
import styled from 'styled-components'
import assetTypes from '@const/AssetTypes'
import Tabs from '@components/Tabs/Tabs'

const { STATUS_INVEST_HOST } = config

interface IndicatorsProps {
  reits: IReitItem[]
  goodReits: IReitItem[]
}

const IndicatorsTitle = styled.h1`
  font-size: 32px;
`

const Indicators = ({ reits, goodReits }: IndicatorsProps) => {
  const [search, setSearch] = useState<string>('')
  const [isGoodReits, setIsGoodReits] = useState<boolean>(false)

  const setSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toUpperCase())
  }

  const goToFundamentus = (share: string) => {
    const router = Router
    router.push(`${STATUS_INVEST_HOST}/acoes/${share.toLowerCase()}`)
  }

  const tabsList = Object.values(assetTypes).filter(
    (assetType) => assetType.name === 'stocks' || assetType.name === 'reits'
  )

  return (
    <Template tabTitle="all-reits">
      <Tabs
        assetTypes={tabsList}
        activeTab={{ title: 'Fundos Imobiliários', name: 'reits' }}
        setActiveTab={(tab) => Router.push(`/indicators/${tab.name}`)}
      />
      <SearchBar
        setSearchText={setSearchText}
        value={search}
        placeholder="Ativo"
      ></SearchBar>
      <WishListProvider>
        <TableToggle
          columns={tableColumnsReits}
          assets={isGoodReits ? goodReits : reits}
          value={search}
          setIsGoodAsset={setIsGoodReits}
          isGoodAsset={isGoodReits}
          goToFundamentus={goToFundamentus}
        ></TableToggle>
        <WishListPopUp></WishListPopUp>
      </WishListProvider>
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

  const reits = await fetch(`${process.env.NEXT_PUBLIC_SHARE_API}/reits`, {
    ...authorization
  })
  const goodReits = await fetch(
    `${process.env.NEXT_PUBLIC_SHARE_API}/reits?optimized=true`,
    { ...authorization }
  )
  const { items: reitItems } = (await reits.json()) as IStockItemResponse
  const { items: goodReitItems } =
    (await goodReits.json()) as IStockItemResponse

  return {
    props: {
      reits: reitItems,
      goodReits: goodReitItems
    }
  }
}

export default Indicators

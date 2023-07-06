import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import TableToggle from 'features/indicators/TableToggle/TableToggle'
import SearchBar from 'components/SearchBar/SearchBar'
import config from 'configs'
import Template from 'layout/Template/Template'
import WishListPopUp from 'features/indicators/WishListPopUp/WishListPopUp'
import WishListProvider from 'context/WishList'
import * as S from './styles'
import { tableColumns } from './constants'

const { SHARE_API, STATUS_INVEST_HOST } = config

interface IndicatorsProps {
  reits: IReitItem[]
  goodReits: IReitItem[]
}

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

  return (
    <Template tabTitle="all-reits">
      <S.IndicatorsTitle>
        Escolha os ativos de acordo com os indicadores
      </S.IndicatorsTitle>
      <SearchBar
        setSearchText={setSearchText}
        value={search}
        placeholder="Ativo"
      ></SearchBar>
      <WishListProvider>
        <TableToggle
          columns={tableColumns}
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

export const getServerSideProps: GetServerSideProps = async () => {
  const shares = await fetch(`${SHARE_API}/reits`)
  const goodReits = await fetch(`${SHARE_API}/reits?optimized=true`)
  const { items: reitItems } = (await shares.json()) as IStockItemResponse
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

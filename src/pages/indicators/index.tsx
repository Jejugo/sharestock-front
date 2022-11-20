import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import TableToggle from 'components/TableToggle/TableToggle'
import SearchBar from 'components/SearchBar/SearchBar'
import config from 'configs'
import Template from 'layout/Template/Template'
import WishListPopUp from 'components/WishListPopUp/WishListPopUp'
import WishListProvider from 'context/WishList'
import * as S from './styles'

const { SHARE_API, STATUS_INVEST_HOST } = config

interface IndicatorsProps {
  shares: IFundamentusStockItem[]
  goodShares: IFundamentusStockItem[]
}

const Indicators = ({ shares, goodShares }: IndicatorsProps) => {
  const [search, setSearch] = useState<string>('')
  const [isGoodShares, setIsGoodShares] = useState<boolean>(false)

  const setSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toUpperCase())
  }

  const goToFundamentus = (share: string) => {
    const router = Router
    router.push(`${STATUS_INVEST_HOST}/${share.toLowerCase()}`)
  }

  return (
    <Template tabTitle="all-shares">
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
          shares={isGoodShares ? goodShares : shares}
          value={search}
          setIsGoodShares={setIsGoodShares}
          isGoodShares={isGoodShares}
          goToFundamentus={goToFundamentus}
        ></TableToggle>
        <WishListPopUp></WishListPopUp>
      </WishListProvider>
    </Template>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const shares = await fetch(`${SHARE_API}/fundamentus/shares/indicators`)
  const goodShares = await fetch(
    `${SHARE_API}/fundamentus/shares/indicators?optimized=true`
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
}

export default Indicators

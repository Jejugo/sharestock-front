import React, { useState, useEffect } from 'react'
import { GetServerSideProps, GetServerSidePropsResult } from 'next'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import Table from '@components/Table/Table'
import SearchBar from '../components/SearchBar/SearchBar'
import config from '../configs'
import Template from '../skeleton/Template/Template'
import WishListPopUp from '../components/WishListPopUp/WishListPopUp'
import WishListProvider from '../context/WishList'
import * as S from '@skeleton/TableLayout/styles'

const { SHARE_API } = config
const STATUS_INVEST_HOST = 'https://statusinvest.com.br/acoes/'
interface IndicatorsProps {
  shares: IFundamentusStockItem[]
  goodShares: IFundamentusStockItem[]
}

const Indicators = ({ shares, goodShares }: IndicatorsProps) => {
  const [search, setSearch] = useState<string>('')
  const [isGoodShares, setIsGoodShares] = useState<boolean>(false)
  const [fixTableHeader, setFixTableHeader] = useState<boolean>(false)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])

  const handleSearchBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toUpperCase())
    setFixTableHeader(false)
  }

  const goToFundamentus = (share: string) => {
    const router = Router
    router.push(`${STATUS_INVEST_HOST}/${share.toLowerCase()}`)
  }

  const isTableHeaderFixed = (position: { top: number }) => position.top < 0

  const handleScroll = () => {
    const elem = document.getElementById('share-data')
    const position = elem?.getBoundingClientRect()

    position && setFixTableHeader(isTableHeaderFixed(position))
  }

  return (
    <>
      <Template tabTitle={'all-shares'}>
        <section style={{ width: '90%', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', fontFamily: "'Amatic SC', cursive" }}>
            {' '}
            Escolha os ativos de acordo com os indicadores{' '}
          </h1>
          <SearchBar
            handleSearchBar={handleSearchBar}
            value={search}
            placeholder={'Ativo'}
          ></SearchBar>
          <S.TableLayoutContainer>
            <WishListProvider>
              <Table
                fixTableHeader={fixTableHeader}
                shares={isGoodShares ? goodShares : shares}
                value={search}
                setIsGoodShares={setIsGoodShares}
                isGoodShares={isGoodShares}
                goToFundamentus={goToFundamentus}
              ></Table>
              <WishListPopUp></WishListPopUp>
            </WishListProvider>
          </S.TableLayoutContainer>
        </section>
      </Template>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const shares = await fetch(`${SHARE_API}/shares/indicators`)
  const goodShares = await fetch(
    `${SHARE_API}/shares/indicators?optimized=true`
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

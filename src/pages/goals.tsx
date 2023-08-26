import React from 'react'
import Template from '@layout/Template/Template'
import InvestmentPercentages from '@features/goals/InvestmentPercentages/InvestmentPercentages'
import { Sector } from '@features/goals/InvestmentPercentages/interfaces'

interface IGoals {
  stockSectors: Sector[]
  reitSectors: Sector[]
  bondsSectors: Sector[]
  internationalSectors: Sector[]
  cryptoSectors: Sector[]
  overviewSectors: Sector[]
}

export default function Goals({
  stockSectors,
  reitSectors,
  bondsSectors,
  internationalSectors,
  cryptoSectors,
  overviewSectors
}: IGoals) {
  return (
    <Template tabTitle="strategy">
      <InvestmentPercentages
        {...{
          stockSectors,
          reitSectors,
          bondsSectors,
          internationalSectors,
          cryptoSectors,
          overviewSectors
        }}
      ></InvestmentPercentages>
    </Template>
  )
}
export async function getServerSideProps(context: any) {
  const accessToken = context.req.cookies.accessToken

  const authorization = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }

  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_SHARE_API}/assets/all/sectors`,
      { ...authorization }
    )

    const {
      items: { stocks, reits, bonds, international, crypto, overview }
    } = (await data.json()) as {
      items: {
        stocks: Sector[]
        reits: Sector[]
        bonds: Sector[]
        international: Sector[]
        crypto: Sector[]
        overview: Sector[]
      }
    }

    return {
      props: {
        stockSectors: stocks,
        reitSectors: reits,
        bondsSectors: bonds,
        internationalSectors: international,
        cryptoSectors: crypto,
        overviewSectors: overview
      }
    }
  } catch (err) {
    return {
      props: {
        stockSectors: [],
        reitSectors: [],
        bondsSectors: [],
        internationalSectors: []
      }
    }
  }
}

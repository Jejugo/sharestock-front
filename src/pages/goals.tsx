import React from 'react'
import Template from '../layout/Template/Template'
import config from '../configs'
import InvestmentPercentages from 'features/goals/InvestmentPercentages/InvestmentPercentages'

const { SHARE_API } = config
interface IGoals {
  stockSectors: string[]
  reitSectors: string[]
  bondsSectors: string[]
  internationalSectors: string[]
}

export default function Goals({
  stockSectors,
  reitSectors,
  bondsSectors,
  internationalSectors
}: IGoals) {
  return (
    <Template tabTitle="strategy">
      <InvestmentPercentages
        stockSectors={stockSectors}
        reitSectors={reitSectors}
        bondsSectors={bondsSectors}
        internationalSectors={internationalSectors}
      ></InvestmentPercentages>
    </Template>
  )
}
export async function getServerSideProps() {
  try {
    const data = await fetch(`${SHARE_API}/assets/all/sectors`)
    const {
      items: { stocks, reits, bonds, international }
    } = (await data.json()) as {
      items: {
        stocks: string[]
        reits: string[]
        bonds: string[]
        international: string[]
      }
    }

    // ADD REITS

    return {
      props: {
        stockSectors: stocks,
        reitSectors: reits,
        bondsSectors: bonds,
        internationalSectors: international
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

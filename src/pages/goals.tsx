import React from 'react'
import Template from '../layout/Template/Template'
import config from '../configs'
import InvestmentPercentages from 'features/goals/InvestmentPercentages/InvestmentPercentages'

const { SHARE_API } = config
interface IGoals {
  shareList: IStockItem[]
}

export default function Goals({ shareList }: IGoals) {
  return (
    <Template tabTitle="strategy">
      <InvestmentPercentages shareList={shareList}></InvestmentPercentages>
    </Template>
  )
}
export async function getServerSideProps() {
  const data = await fetch(`${SHARE_API}/shares`)
  const { items: shareList } = (await data.json()) as IStockItemResponse

  return {
    props: {
      shareList
    }
  }
}

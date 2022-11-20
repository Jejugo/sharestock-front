import React from 'react'
import CompanyTypePercentages from 'features/goals/InvestmentPercentages/InvestmentPercentages'
import Template from '../layout/Template/Template'
import config from '../configs'

const { SHARE_API } = config
interface IGoals {
  shareList: IStockItem[]
}

export default function Goals({ shareList }: IGoals) {
  return (
    <Template tabTitle="strategy">
      <CompanyTypePercentages shareList={shareList}></CompanyTypePercentages>
    </Template>
  )
}
export async function getServerSideProps() {
  const data = await fetch(`${SHARE_API}/shares/all`)
  const { items: shareList } = (await data.json()) as IStockItemResponse

  return {
    props: {
      shareList
    }
  }
}

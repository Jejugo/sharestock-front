import React from 'react'
import CompanyTypePercentages from '../components/InvestmentPercentages/InvestmentPercentages'
import Template from '../skeleton/Template/Template'
import config from '../configs'

const { SHARE_API } = config
interface IGoals {
  shareList: IStockItem[]
}

export default function Goals({ shareList }: IGoals) {
  return (
    <section>
      <Template tabTitle={'strategy'}>
        <CompanyTypePercentages shareList={shareList}></CompanyTypePercentages>
      </Template>
    </section>
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

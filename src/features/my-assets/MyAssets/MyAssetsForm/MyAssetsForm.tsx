import React from 'react'
import { FormProvider } from 'react-hook-form'
import useMyAssetsForm from '../hooks/useMyAssetsForm'
import MyAssetsContent from '../MyAssetsContent/MyAssetsContent'
import * as S from './MyAssetsForm.style'
import { IArrayToObject } from 'firebase/interfaces'
import Router from 'next/router'
import config from '../../../../configs'

const getStatusInvestLink: Record<'stocks' | 'reits', string> = {
  stocks: 'acoes',
  reits: 'fundos-imobiliarios'
}

const noStrategyTabs = (tabName: AssetTypes) =>
  ['bonds', 'international', 'crypto'].includes(tabName)

const initialState = (tabName: AssetTypes) => {
  const tabKey = noStrategyTabs(tabName) ? 'value' : 'quantity'
  return {
    statements: [],
    selectedAsset: '',
    [tabKey]: ''
  }
}

interface IMyAssetsForm {
  tabName: AssetTypes
  dropdownList: IDropdownList
  assetStrategyData?: any
  assetMap?: IArrayToObject<any>
}

export default function MyAssetsForm({
  tabName = 'stocks',
  dropdownList,
  assetStrategyData,
  assetMap
}: IMyAssetsForm) {
  const { methods, onSubmit } = useMyAssetsForm({
    initialState: {
      [tabName]: initialState(tabName)
    },
    assetMap,
    tabName,
    assetStrategyData
  })
  const selectedAsset = methods.watch(tabName).selectedAsset.value

  const handleStatusInvest = () => {
    if (
      !selectedAsset ||
      tabName === 'international' ||
      tabName === 'bonds' ||
      tabName === 'crypto'
    )
      return

    window.open(
      `${config.STATUS_INVEST_HOST}/${
        getStatusInvestLink[tabName as 'stocks' | 'reits']
      }/${selectedAsset}`,
      '_blank'
    )
  }

  return (
    <div>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <S.TopActions>
            <S.StatusInvestBtn
              onClick={handleStatusInvest}
              disabled={false}
              type="button"
            >
              Status Invest
            </S.StatusInvestBtn>
            <div>
              <S.AddAssetBtn type="submit">Salvar</S.AddAssetBtn>
              <S.AddAssetBtn
                type="button"
                onClick={() => Router.push(`/invest`)}
              >
                Voltar
              </S.AddAssetBtn>
            </div>
          </S.TopActions>
          <MyAssetsContent
            name={tabName}
            dropdownAssetList={dropdownList as IDropdownItem[]}
          />
        </FormProvider>
      </form>
    </div>
  )
}

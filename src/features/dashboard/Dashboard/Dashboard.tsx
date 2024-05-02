import React from 'react'
import PieChartComponent from '@components/charts/PieChart/PieChart'
import TableComponent from '@components/AssetTable/AssetTable'
import Slider from '@components/Slider/Slider'

import { Tooltip } from 'recharts'

import CustomTooltipGoals from '@components/charts/PieChart/CustomTooltip/CustomTooltipGoals'
import CustomTooltipSlider from '@components/charts/PieChart/CustomTooltip/CustomTooltipSlider'
import * as S from './styles'

import Title from '@components/Title/Title'
import Text from '@components/Text/Text'

import useAssetsSummary from '../../../hooks/useAssetsSummary'
import useChartData from '../../../hooks/useChartData'
import Flex from '@components/container/Flex/Flex'
import Loading from '@components/Loading/Loading'

import styled from 'styled-components'
import { useUserDataContext } from '@context/UserDataContext'

interface IDashboardComponent {
  sharesMap: IArrayToObject<IStockItem>
  reitsMap: IArrayToObject<IReitItem>
}

const StyledFlex = styled(Flex)`
  height: 100%;
`

export default function DashboardComponent({
  sharesMap,
  reitsMap
}: IDashboardComponent) {
  const { userData } = useUserDataContext()
  const { isLoading: isSliderMapLoading, sliderMap } = useAssetsSummary({
    sharesMap,
    reitsMap
  })

  const {
    currentChartData,
    goalsChartData,
    totalValue,
    isLoading: isChardDataLoading
  } = useChartData()

  const isLoading = isChardDataLoading || isSliderMapLoading

  return (
    <>
      <S.DashboardComponentWrapper>
        <S.Grid>
          {isLoading ? (
            <Loading />
          ) : (
            currentChartData && (
              <>
                <S.GoalsPieChart>
                  <PieChartComponent
                    data={currentChartData}
                    width="90%"
                    height="50%"
                  >
                    {userData.showMoneyInvested && (
                      <Tooltip
                        cursor={{ fill: '#ccc', opacity: '0.1' }}
                        content={
                          <CustomTooltipGoals
                            assetGoals={goalsChartData}
                            totalValue={totalValue}
                          />
                        }
                      />
                    )}
                  </PieChartComponent>
                </S.GoalsPieChart>

                <S.DataSummary>
                  <StyledFlex
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {currentChartData.length ? (
                      currentChartData.map((asset, index) => (
                        <S.CurrentChartData key={index}>
                          <Text color="white" noMargin>
                            {asset.name}
                          </Text>
                          <Title
                            text={
                              userData.showMoneyInvested
                                ? `${asset.value.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                  })}`
                                : '-'
                            }
                            color="#82ca9d"
                            noMargin
                          />
                        </S.CurrentChartData>
                      ))
                    ) : (
                      <div>No data</div>
                    )}
                  </StyledFlex>
                </S.DataSummary>

                <S.SliderWrapper>
                  {sliderMap.length ? (
                    <Slider>
                      {sliderMap.map((slideItem, index) => {
                        return (
                          <React.Fragment key={index}>
                            <Title text={slideItem.title} />
                            <S.SliderItem key={slideItem.title}>
                              <S.PieDashboardWrapper>
                                <PieChartComponent
                                  data={slideItem.data}
                                  width="80%"
                                >
                                  <Tooltip
                                    isAnimationActive={true}
                                    animationDuration={2}
                                    animationEasing="ease"
                                    formatter={(data: string) =>
                                      `${(parseInt(data) * 100).toString()}%`
                                    }
                                    content={
                                      <CustomTooltipSlider
                                        simpleAsset={
                                          slideItem.title === 'Renda Fixa' ||
                                          slideItem.title === 'Internacional' ||
                                          slideItem.title === 'Crypto'
                                        }
                                        assetGoals={slideItem.goals}
                                        assetSectors={slideItem.sectors}
                                      />
                                    }
                                  />
                                </PieChartComponent>
                              </S.PieDashboardWrapper>
                            </S.SliderItem>
                          </React.Fragment>
                        )
                      })}
                    </Slider>
                  ) : (
                    <StyledFlex justifyContent="center" alignItems="center">
                      <div>No data</div>
                    </StyledFlex>
                  )}
                </S.SliderWrapper>
              </>
            )
          )}
        </S.Grid>
      </S.DashboardComponentWrapper>

      <S.WalletAssets>
        <TableComponent />
      </S.WalletAssets>
    </>
  )
}

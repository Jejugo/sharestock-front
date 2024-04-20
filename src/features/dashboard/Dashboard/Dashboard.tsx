import React, { useState } from 'react'
import PieChartComponent from '@components/charts/PieChart/PieChart'
import TableComponent from '@components/AssetTable/AssetTable'
import Slider from '@components/Slider/Slider'

import { Tooltip } from 'recharts'

import CustomTooltipGoals from '@components/charts/PieChart/CustomTooltip/CustomTooltipGoals'
import CustomTooltipSlider from '@components/charts/PieChart/CustomTooltip/CustomTooltipSlider'
import * as S from './styles'

import Title from '@components/Title/Title'
import Text from '@components/Text/Text'

import useAssetsSummary from './hooks/useAssetsSummary'
import useChartData from './hooks/useChartData'
import Flex from '@components/container/Flex/Flex'
import Loading from '@components/Loading/Loading'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { ISliderMap } from './types'
import styled from 'styled-components'

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
  const [hideTotalValue, setHideTotalValue] = useState(false)

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
        <Flex justifyContent="space-between">
          <Title text="Olá, Jeff" />
          <Flex justifyContent="space-between" alignItems="center">
            {hideTotalValue ? (
              <VisibilityOffIcon
                sx={{
                  marginRight: 2,
                  cursor: 'pointer'
                }}
                onClick={() => setHideTotalValue((prevState) => !prevState)}
              />
            ) : (
              <VisibilityIcon
                sx={{
                  marginRight: 2,
                  cursor: 'pointer'
                }}
                onClick={() => setHideTotalValue((prevState) => !prevState)}
              />
            )}

            <Title
              text={
                !hideTotalValue
                  ? totalValue.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })
                  : `R$ 0,00`
              }
              color="#82ca9d"
            />
          </Flex>
        </Flex>
        {isLoading ? (
          <Loading />
        ) : (
          <S.Grid>
            {currentChartData.length > 0 && (
              <S.GoalsPieChart>
                <PieChartComponent data={currentChartData} width="50%">
                  <Tooltip
                    cursor={{ fill: '#ccc', opacity: '0.1' }}
                    content={
                      <CustomTooltipGoals
                        assetGoals={goalsChartData}
                        totalValue={totalValue}
                      />
                    }
                  />
                </PieChartComponent>
              </S.GoalsPieChart>
            )}

            <S.DataSummary>
              <StyledFlex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                {currentChartData.map((asset) => (
                  <>
                    <Text color="white" noMargin>
                      {asset.name}
                    </Text>
                    <Title
                      text={`R$${asset.value.toString()}`}
                      color="#82ca9d"
                      noMargin
                    />
                  </>
                ))}
              </StyledFlex>
            </S.DataSummary>

            {sliderMap.length ? (
              <S.SliderWrapper>
                <Slider>
                  {sliderMap.map((slideItem) => {
                    return (
                      <>
                        <Title text={slideItem.title} />
                        <S.SliderItem key={slideItem.title}>
                          <S.PieDashboardWrapper>
                            <PieChartComponent
                              data={slideItem.data}
                              width="100%"
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
                      </>
                    )
                  })}
                </Slider>
              </S.SliderWrapper>
            ) : null}
          </S.Grid>
        )}
      </S.DashboardComponentWrapper>

      <S.WalletAssets>
        <TableComponent hideTotalValue={hideTotalValue} />
      </S.WalletAssets>
    </>
  )
}

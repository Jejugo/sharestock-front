import React, { useState } from 'react'
import PieChartComponent from '@components/charts/PieChart/PieChart'
import TableComponent from '@components/AssetTable/AssetTable'
import Slider from '@components/Slider/Slider'

import { Tooltip } from 'recharts'

import CustomTooltip from '@components/charts/PieChart/CustomTooltip/CustomTooltip'
import CustomTooltipBarChart from '@components/charts/BarChart/CustomTooltip/CustomTooltip'
import * as S from './styles'

import Title from '@components/Title/Title'
import Text from '@components/Text/Text'

import usePieChartData from './hooks/usePieChartData'
import useBarChartData from './hooks/useBarChartData'
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
  const [sliderMap, setSliderMap] = useState<ISliderMap[]>([] as ISliderMap[])
  const [hideTotalValue, setHideTotalValue] = useState(false)

  usePieChartData({
    sharesMap,
    reitsMap,
    setSliderMap
  })

  const { currentChartData, goalsChartData, totalValue } = useBarChartData()

  const isLoading =
    sliderMap.length === 0 ||
    currentChartData.length === 0 ||
    goalsChartData.length === 0

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
                      <CustomTooltipBarChart
                        decimals={2}
                        totalValue={totalValue}
                        goalsData={goalsChartData}
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
                                  <CustomTooltip
                                    simpleAsset={
                                      slideItem.title === 'Bonds' ||
                                      slideItem.title === 'International'
                                    }
                                    assetGoals={slideItem.goals}
                                    assetSectors={slideItem.sectors}
                                    decimals={2}
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

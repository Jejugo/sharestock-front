import React, { useState, useEffect } from 'react'
import PieChartComponent from 'components/charts/PieChart/PieChart'
import BarCharComponent from 'components/charts/BarChart/BarChart'
import TableComponent from 'components/AssetTable/AssetTable'
import Text from 'components/Text/Text'
import Slider from 'components/Slider/Slider'

import { Tooltip } from 'recharts'

import CustomTooltip from 'components/charts/PieChart/CustomTooltip/CustomTooltip'
import CustomTooltipBarChart from 'components/charts/BarChart/CustomTooltip/CustomTooltip'
import * as S from './styles'

import Title from 'components/Title/Title'

import usePieChartData from './hooks/usePieChartData'
import useBarChartData from './hooks/useBarChartData'
import Flex from 'components/container/Flex/Flex'
import Loading from 'components/Loading/Loading'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

interface IArrayToObject<T> {
  [key: string]: T
}
interface IDashboardComponent {
  sharesMap: IArrayToObject<IStockItem>
  reitsMap: IArrayToObject<IReitItem>
}

export interface IGoal {
  id: number
  name: string
  value: number
}

export interface ISliderMap {
  title: string
  goals: {
    id: number
    name: string
    value: number
  }[]
  data: {
    name: string
    value: number
  }[]
  sectors: {
    name: string
    sector: string
    value: number
  }[]
}

export default function DashboardComponent({
  sharesMap,
  reitsMap
}: IDashboardComponent) {
  const [sliderMap, setSliderMap] = useState<ISliderMap[]>([] as ISliderMap[])

  const [totalValue, setTotalValue] = useState(0)
  const [hideTotalValue, setHideTotalValue] = useState(false)

  usePieChartData({
    sharesMap,
    reitsMap,
    setSliderMap
  })

  const { currentChartData, goalsChartData } = useBarChartData(totalValue)

  useEffect(
    () =>
      setTotalValue(
        currentChartData.reduce((acc, curr) => acc + curr.value, 0)
      ),
    [currentChartData]
  )

  return (
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
      {currentChartData.length === 0 ||
      goalsChartData.length === 0 ||
      sliderMap.length === 0 ? (
        <Loading />
      ) : (
        <>
          <S.BarChartComponents>
            {currentChartData.length > 0 && (
              <>
                <Text color="white">Current Value</Text>
                <BarCharComponent data={currentChartData} barColor="#8884d8">
                  <Tooltip
                    cursor={{ fill: '#ccc', opacity: '0.1' }}
                    content={
                      <CustomTooltipBarChart
                        decimals={2}
                        totalValue={totalValue}
                      />
                    }
                  />
                </BarCharComponent>
              </>
            )}
            {goalsChartData.length > 0 && (
              <>
                <Text color="white">Goals</Text>
                <BarCharComponent data={goalsChartData} barColor="#82ca9d">
                  <Tooltip cursor={{ fill: '#ccc', opacity: '0.1' }} />
                </BarCharComponent>
              </>
            )}
          </S.BarChartComponents>
          {sliderMap.length ? (
            <Slider>
              {sliderMap.map((slideItem) => {
                return (
                  <S.SliderItem key={slideItem.title}>
                    <Title text={slideItem.title} />
                    <S.DashboardWrapper>
                      <PieChartComponent
                        data={slideItem.data}
                        size={{ width: 650, height: 300 }}
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
                              assetSectors={slideItem.sectors}
                              decimals={2}
                            />
                          }
                        />
                      </PieChartComponent>
                      {[slideItem.goals]?.length > 0 ? (
                        <PieChartComponent
                          data={slideItem.goals}
                          size={{ width: 650, height: 300 }}
                        >
                          <Tooltip
                            isAnimationActive={true}
                            animationDuration={2}
                            animationEasing="ease"
                            content={
                              <CustomTooltip
                                simpleAsset={false}
                                assetSectors={slideItem.sectors}
                                decimals={0}
                              />
                            }
                          />
                        </PieChartComponent>
                      ) : null}
                    </S.DashboardWrapper>
                  </S.SliderItem>
                )
              })}
            </Slider>
          ) : null}
        </>
      )}

      <S.WalletAssets>
        <TableComponent />
      </S.WalletAssets>
    </S.DashboardComponentWrapper>
  )
}

import React from 'react'
import Slider from '@mui/material/Slider'
import DeleteIcon from '@mui/icons-material/Delete'
import { Cell, Pie, PieChart, Tooltip } from 'recharts'

import * as S from '../styles'
import { useFormContext } from 'react-hook-form'
import PieChartComponent from '@components/charts/PieChart/PieChart'

interface IAssetType {
  value: string
  id: number
  name: string
}

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#9999ff',
  '#d6aa7f',
  '#a45a52',
  '#36c90e',
  '#cc3333',
  '#fbbaf7',
  '#82a8f4'
]

export default function BondsPercentages() {
  const { getValues, setValue, watch } = useFormContext()

  const bondValues = watch('bonds')
  console.log('->', bondValues)

  const setAssetType = (
    values: IAssetType[],
    assetType: string,
    index: number
  ) => {
    setValue('bonds', [...values, { name: assetType, value: '', id: index }])
  }

  const handleAssetType = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    if (bondValues.find((stock: IAssetType) => stock.name === e.target.value)) {
      alert('Voce ja possui esse ativo!')
      return
    }
    const newValues = [
      ...bondValues.filter((stock: IAssetType) => stock.id !== index)
    ]
    setAssetType(newValues, e.target.value, index)
  }

  const removeAssetItem = (id: number) => {
    const newValues = bondValues.filter((stock: IAssetType) => stock.id !== id)
    setValue('bonds', newValues)
  }

  const addEmptyItem = () => {
    setValue('bonds', [
      ...bondValues,
      { name: '', value: '', id: bondValues.length }
    ])
  }

  const checkIfPercentagesSum100 = (arr: IAssetType[]) => {
    const sum = arr.reduce((acc, curr) => {
      return parseInt(curr.value) + acc
    }, 0)
    return sum === 100
  }

  const handleAssetPercentage = (e: Event, id: number) => {
    setValue(
      'bonds',
      bondValues.map((stock: IAssetType) =>
        stock.id === id
          ? {
              ...stock,
              value: (e.target as HTMLInputElement).value
            }
          : stock
      )
    )
  }

  return (
    <section>
      <S.PercentageWrapper>
        <S.ChartComponent>
          <PieChartComponent
            size={{ width: 600, height: 600 }}
            data={bondValues}
          >
            <Tooltip
              isAnimationActive={true}
              animationDuration={2}
              animationEasing="ease"
              formatter={(data: string) => `${data}%`}
              // @ts-ignore
            />
          </PieChartComponent>
        </S.ChartComponent>
        <S.Percentages>
          <S.PercentageList>
            <S.InvestTypeTitle>Renda Fixa</S.InvestTypeTitle>
            {checkIfPercentagesSum100(bondValues) === true ? (
              <S.PercentagesFeedback color="green">
                {' '}
                Os valores somam 100%!{' '}
              </S.PercentagesFeedback>
            ) : (
              <S.PercentagesFeedback color="red">
                Os valores tem que somar 100%.
              </S.PercentagesFeedback>
            )}
            {getValues().stocks.length > 0 &&
              bondValues.map((stock: IAssetType, index: number) => (
                <S.PercentageListItem key={index}>
                  <S.PercentageHeader>
                    <S.PercentageDropdown
                      name="percentage"
                      onChange={(e) => handleAssetType(e, index)}
                      value={stock.name}
                    >
                      <option disabled selected value="">
                        Escolha
                      </option>
                      <option value="selic-futuro">Selic futuro</option>
                      <option value="selic-presente">Selic presente</option>
                      <option value="prefixado">Tesouro Prefixado</option>
                      <option value="cdb">CDB</option>
                      <option value="lci">LCI</option>
                      <option value="lca">LCA</option>
                      <option value="cri">CRI</option>
                    </S.PercentageDropdown>

                    <S.PercentageItemRemove
                      onClick={(e) => removeAssetItem(stock.id)}
                    >
                      <DeleteIcon />
                    </S.PercentageItemRemove>
                  </S.PercentageHeader>
                  <S.PercentageSlider>
                    <S.CustomSlider
                      aria-label="Custom marks"
                      defaultValue={0}
                      aria-valuetext=""
                      step={5}
                      valueLabelDisplay="auto"
                      onChange={(e) => handleAssetPercentage(e, stock.id)}
                      value={parseInt(stock.value)}
                      customColor={COLORS[index]}
                    />
                    <S.PercentageValue>{stock.value}%</S.PercentageValue>
                  </S.PercentageSlider>
                </S.PercentageListItem>
              ))}
          </S.PercentageList>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <S.PercentagesBtn onClick={addEmptyItem}>
              Adicionar
            </S.PercentagesBtn>
          </div>
        </S.Percentages>
      </S.PercentageWrapper>
    </section>
  )
}

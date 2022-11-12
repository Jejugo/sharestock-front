import React from 'react'
import Slider from '@mui/material/Slider'
import DeleteIcon from '@mui/icons-material/Delete'
import { Cell, Pie, PieChart, Tooltip } from 'recharts'

import * as S from '../styles'
import { useFormContext } from 'react-hook-form'

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

export default function InternationalPercentages() {
  const { getValues, setValue, watch } = useFormContext()

  const internationalValues = watch('international')

  const setAssetType = (
    values: IAssetType[],
    assetType: string,
    index: number
  ) => {
    setValue('international', [
      ...values,
      { name: assetType, value: '', id: index }
    ])
  }

  const removeAssetItem = (id: number) => {
    const newValues = internationalValues.filter(
      (stock: IAssetType) => stock.id !== id
    )
    setValue('international', newValues)
  }

  const handleAssetType = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    if (
      internationalValues.find(
        (stock: IAssetType) => stock.name === e.target.value
      )
    ) {
      alert('Voce ja possui esse ativo!')
      return
    }
    const newValues = [
      ...internationalValues.filter((stock: IAssetType) => stock.id !== index)
    ]
    setAssetType(newValues, e.target.value, index)
  }

  const addEmptyItem = () => {
    setValue('international', [
      ...internationalValues,
      { name: '', value: '', id: internationalValues.length }
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
      'international',
      internationalValues.map((stock: IAssetType) =>
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
          <PieChart width={600} height={600}>
            <Pie
              dataKey="value"
              data={internationalValues}
              cx="50%"
              cy="50%"
              outerRadius={150}
              style={{ fontWeight: '600' }}
              label
            >
              <Tooltip />
              {internationalValues.map((_: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </S.ChartComponent>
        <S.Percentages>
          <S.PercentageList>
            <S.InvestTypeTitle>Ativos Internacionais</S.InvestTypeTitle>
            {checkIfPercentagesSum100(internationalValues) === true ? (
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
              internationalValues.map((stock: IAssetType, index: number) => (
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
                      <option value="medical-etf">Medical ETF</option>
                      <option value="games-etf">Games ETF</option>
                      <option value="dividends-etf">Dividends ETF</option>
                      <option value="s&p-etf">S&P ETF</option>
                      <option value="treasury">Treasury</option>
                      <option value="reits">Reits</option>
                      <option value="reits">Stocks</option>
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

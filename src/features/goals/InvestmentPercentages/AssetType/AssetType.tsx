import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { Tooltip } from 'recharts'

import * as S from '../styles'
import { useController } from 'react-hook-form'
import PieChartComponent from 'components/charts/PieChart/PieChart'

interface IAssetType {
  value: string
  id: number
  name: string
}

interface IAssetTypeParams {
  title: string
  name: string
  dropdownItems?: string[]
  colors: string[]
}

export default function AssetType({
  title,
  name,
  dropdownItems = [],
  colors
}: IAssetTypeParams) {
  const {
    field: { value, onChange: fieldOnChange }
  } = useController({ name })

  const setAssetType = (
    values: IAssetType[],
    assetType: string,
    index: number
  ) => {
    const newValues = [...values, { name: assetType, value: '', id: index }]
    fieldOnChange(newValues.sort((a, b) => (a.id > b.id ? 1 : -1)))
  }

  const handleAssetType = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    if (value.find((stock: IAssetType) => stock.name === e.target.value)) {
      alert('Voce ja possui esse ativo!')
      return
    }
    const newValues = value.filter((stock: IAssetType) => stock.id !== index)

    setAssetType(newValues, e.target.value, index)
  }

  const removeAssetItem = (id: number) => {
    const newValues = value.filter((stock: IAssetType) => stock.id !== id)
    fieldOnChange(newValues)
  }

  const addEmptyItem = () => {
    fieldOnChange([...value, { name: '', value: '', id: value.length }])
  }

  const checkIfPercentagesSum100 = (arr: IAssetType[]) => {
    const sum = arr.reduce((acc, curr) => {
      return parseInt(curr.value) + acc
    }, 0)
    return sum === 100
  }

  const handleAssetPercentage = (e: Event, id: number) => {
    fieldOnChange(
      value.map((stock: IAssetType) =>
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
          <S.InvestTypeTitle>{title}</S.InvestTypeTitle>
          <PieChartComponent size={{ width: 800, height: 300 }} data={value}>
            <Tooltip
              isAnimationActive={true}
              animationDuration={2}
              animationEasing="ease"
              formatter={(data: string) => `${data}%`}
            />
          </PieChartComponent>
        </S.ChartComponent>
        <S.Percentages>
          <S.PercentageList>
            {checkIfPercentagesSum100(value) === true ? (
              <S.PercentagesFeedback color="green">
                Os valores somam 100%!
              </S.PercentagesFeedback>
            ) : (
              <S.PercentagesFeedback color="red">
                Os valores tem que somar 100%.
              </S.PercentagesFeedback>
            )}
            {value.length > 0 &&
              value.map((stock: IAssetType, index: number) => (
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
                      {dropdownItems.map(
                        (dropdownItem: string, index: number) => (
                          <option
                            key={index}
                            value={dropdownItem.toLowerCase()}
                          >
                            {dropdownItem}
                          </option>
                        )
                      )}
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
                      customColor={colors[index]}
                    />
                    <S.PercentageValue>{stock.value}%</S.PercentageValue>
                  </S.PercentageSlider>
                </S.PercentageListItem>
              ))}
            <S.AddItem onClick={addEmptyItem}>+</S.AddItem>
          </S.PercentageList>
        </S.Percentages>
      </S.PercentageWrapper>
    </section>
  )
}

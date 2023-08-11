import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { Tooltip } from 'recharts'

import * as S from '../styles'
import { useFormContext } from 'react-hook-form'
import PieChartComponent from 'components/charts/PieChart/PieChart'
import CustomSelect from 'components/CustomSelect/CustomSelect'
import { v4 as uuidv4 } from 'uuid'
import { Sector, Option } from '../interfaces'

interface IAssetType {
  value: string
  id: number
  name: string
}

interface IAssetTypeParams {
  title: string
  name: string
  dropdownItems?: Sector[]
  colors: string[]
  onAddNewDropdownItem: (item: string, name: string) => Promise<void>
  onRemoveDropdownItem: (itemId: string, name: string) => Promise<void>
}

export default function AssetType({
  title,
  name,
  dropdownItems = [] as Sector[],
  colors,
  onAddNewDropdownItem,
  onRemoveDropdownItem
}: IAssetTypeParams) {
  const { setValue, getValues } = useFormContext()

  const value = getValues()[name] || {}

  const setAssetType = (
    values: IAssetType[],
    assetOption: Option,
    index: number
  ) => {
    const oldValues = [...values].filter((value: any) => value.index !== index)
    const newValues = [
      ...oldValues,
      {
        id: assetOption.id,
        name: assetOption.name,
        value: 0,
        default: dropdownItems.find((item) => item.id === assetOption.id)
          ?.default,
        index
      }
    ]
    setValue(name, newValues)
  }

  const handleAssetType = (option: Option, index: number) => {
    if (
      value.find(
        (stock: IAssetType) =>
          stock.name.toLowerCase() === option.name.toLowerCase()
      )
    ) {
      alert('Voce ja possui esse ativo!')
      return
    }
    const newValues = value.filter((stock: IAssetType) => stock.id !== index)

    setAssetType(newValues, option, index)
  }

  const removeAssetItem = (id: number) => {
    const newValues = value.filter((stock: IAssetType) => stock.id !== id)
    setValue(name, newValues)
  }

  const addEmptyItem = () => {
    setValue(name, [
      ...value,
      { id: uuidv4(), name: '', value: 0, index: value.length }
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
      name,
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
            {checkIfPercentagesSum100(value) ? (
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
                    <CustomSelect
                      value={stock.name}
                      placeholder="Adicione ativo"
                      onSelectItem={(option: Option) => {
                        handleAssetType(option, index)
                      }}
                      onAddItem={(item) => onAddNewDropdownItem(item, name)}
                      onRemoveItem={(itemId) =>
                        onRemoveDropdownItem(itemId, name)
                      }
                      options={dropdownItems.map((item: Sector) => ({
                        id: item.id,
                        name: item.name,
                        showDeleteIcon: !item.default
                      }))}
                      allowAddItem={
                        name === 'international' ||
                        name === 'bonds' ||
                        name === 'crypto'
                      }
                    ></CustomSelect>

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

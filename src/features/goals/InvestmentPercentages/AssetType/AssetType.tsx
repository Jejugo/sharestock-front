import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { Tooltip } from 'recharts'

import * as S from '../styles'
import PieChartComponent from '@components/charts/PieChart/PieChart'
import CustomSelect from '@components/CustomSelect/CustomSelect'

import { Sector, Option } from '../interfaces'
import useAssetSectors from '../hooks/useAssetSectors'

interface IAssetType {
  value: number
  id: string
  name: string
}

interface IAssetTypeParams {
  name: AssetTypes
  dropdownItems?: Sector[]
  colors: string[]
  onAddNewDropdownItem: (item: string, name: AssetTypes) => Promise<void>
  onRemoveDropdownItem: (itemId: string, name: AssetTypes) => Promise<void>
}

export default function AssetType({
  name,
  dropdownItems = [] as Sector[],
  colors,
  onAddNewDropdownItem,
  onRemoveDropdownItem
}: IAssetTypeParams) {
  const initialValue: IAssetType[] = []

  const {
    value,
    handleAssetSector,
    removeAssetSector,
    addEmptySector,
    handleAssetPercentage
  } = useAssetSectors(name, initialValue)

  const assetTypesLeft = dropdownItems.filter(
    (item) => !value.some((val: any) => val.name === item.name)
  )

  const checkIfPercentagesSum100 = (arr: IAssetType[]) => {
    const sum = arr.reduce((acc, curr) => {
      return curr.value + acc
    }, 0)
    return sum === 100
  }
  return (
    <S.PercentageWrapper>
      <S.ChartComponent>
        <PieChartComponent
          data={value}
          width="100%"
          height="50%"
          showLegend={false}
        >
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
            value.map((asset: IAssetType, index: number) => (
              <S.PercentageListItem key={asset.id}>
                <S.PercentageHeader>
                  <CustomSelect
                    value={asset.name}
                    placeholder="Adicione ativo"
                    onSelectItem={(option: Option) => {
                      handleAssetSector(option, asset.id, index)
                    }}
                    onAddItem={(item) => onAddNewDropdownItem(item, name)}
                    onRemoveItem={(itemId) =>
                      onRemoveDropdownItem(itemId, name)
                    }
                    options={dropdownItems
                      .filter(
                        (item) =>
                          !value.some((val: any) => val.name === item.name)
                      )
                      .map((item: Sector) => ({
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
                    onClick={(e) => removeAssetSector(asset.id)}
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
                    onChange={(e) => handleAssetPercentage(e, asset.id)}
                    value={asset.value}
                    customColor={colors[index]}
                  />
                  <S.PercentageValue>{asset.value}%</S.PercentageValue>
                </S.PercentageSlider>
              </S.PercentageListItem>
            ))}
          {assetTypesLeft.length ? (
            <S.AddItem onClick={addEmptySector}>+</S.AddItem>
          ) : null}
        </S.PercentageList>
      </S.Percentages>
    </S.PercentageWrapper>
  )
}

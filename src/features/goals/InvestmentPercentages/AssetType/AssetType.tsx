import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { Tooltip } from 'recharts'

import * as S from '../styles'
import PieChartComponent from '@components/charts/PieChart/PieChart'
import CustomSelect from '@components/CustomSelect/CustomSelect'
import Text from '@components/Text/Text'

import { Sector, Option } from '../interfaces'
import useAssetSectors from '../hooks/useAssetSectors'
import Flex from '@components/container/Flex/Flex'
import CreateCategoriesModal from './CreateCategoriesModal'
import { enqueueSnackbar } from 'notistack'
import ConfirmationModal from '@components/ConfirmationModal/ConfirmationModal'

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
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] =
    React.useState(false)

  const [isRemoveAssetSectorModalOpen, setIsRemoveAssetSectorModalOpen] =
    React.useState(false)
  const [removeAssetSectorId, setRemoveAssetSectorId] = React.useState<
    string | null
  >(null)

  const {
    value,
    handleAssetSector,
    removeAssetSector,
    addEmptySector,
    handleAssetPercentage,
    isComplete
  } = useAssetSectors(name, initialValue)

  const assetTypesLeft = dropdownItems.filter(
    (item) => !value.some((val: any) => val.name === item.name)
  )

  const allowAddItem =
    name === 'international' || name === 'bonds' || name === 'crypto'

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
          {isComplete() ? (
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
                  ></CustomSelect>

                  <S.PercentageItemRemove
                    onClick={() => {
                      if (name === 'overview') {
                        setIsRemoveAssetSectorModalOpen(true)
                        setRemoveAssetSectorId(asset.id)
                      } else {
                        removeAssetSector(asset.id)
                      }
                    }}
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

          <Flex gap={10}>
            {assetTypesLeft.length ? (
              <S.AddItem onClick={addEmptySector}>
                <Text color="white">Adicionar categoria</Text>
              </S.AddItem>
            ) : null}
            {allowAddItem && (
              <>
                <S.AddItem onClick={() => setIsCategoriesModalOpen(true)}>
                  <Text color="white">Criar categoria</Text>
                </S.AddItem>
              </>
            )}
          </Flex>
        </S.PercentageList>
      </S.Percentages>
      <CreateCategoriesModal
        isOpen={isCategoriesModalOpen}
        setIsOpen={setIsCategoriesModalOpen}
        onAddNewDropdownItem={async (item) => {
          try {
            await onAddNewDropdownItem(item, name)
            setIsCategoriesModalOpen(false)
            enqueueSnackbar('Categoria adicionada com sucesso.', {
              variant: 'success',
              preventDuplicate: true
            })
          } catch (err) {
            enqueueSnackbar('Houve um erro ao adicionar essa categoria.', {
              variant: 'error',
              preventDuplicate: true
            })
            console.error('There was an error adding the item: ', err)
          }
        }}
      />
      {isRemoveAssetSectorModalOpen && removeAssetSectorId && (
        <ConfirmationModal
          onConfirm={() => {
            removeAssetSector(removeAssetSectorId)
            setIsRemoveAssetSectorModalOpen(false)
          }}
          isOpen={isRemoveAssetSectorModalOpen}
          onCancel={() => {
            setIsRemoveAssetSectorModalOpen(false)
          }}
        >
          <Text>
            Remover essa categoria irá remover os objetivos já definidos na aba
            referente a ele. Você tem certeza que deseja continuar?
          </Text>
        </ConfirmationModal>
      )}
    </S.PercentageWrapper>
  )
}

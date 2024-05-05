import { useFormContext } from 'react-hook-form'
import { GoalsFormAsset, Option } from '../interfaces'
import { v4 as uuidv4 } from 'uuid'
import { enqueueSnackbar } from 'notistack'

interface IAssetType {
  value: number
  id: string
  name: string
}

// Custom hook to manage asset types
const useAssetSectors = (name: AssetTypes, initialValue: IAssetType[]) => {
  const { setValue, getValues } = useFormContext()
  const value = getValues()[name] || initialValue

  const setAssetType = (
    values: IAssetType[],
    assetOption: Option,
    id: string,
    listIndex: number
  ) => {
    const newValues = values.filter((value) => value.id !== id)
    const newItem = {
      id: assetOption.id,
      name: assetOption.name,
      value: 0
    }
    newValues.splice(listIndex, 0, newItem)
    setValue(name, newValues)
  }

  const handleAssetSector = (option: Option, id: string, listIndex: number) => {
    if (
      value.some(
        (stock: GoalsFormAsset) =>
          stock.name.toLowerCase() === option.name.toLowerCase()
      )
    ) {
      enqueueSnackbar('Você já possui esse ativo', {
        variant: 'error',
        preventDuplicate: true
      })
      return
    }
    setAssetType(
      value.filter((stock: GoalsFormAsset) => stock.id !== id),
      option,
      id,
      listIndex
    )
  }

  const removeAssetSector = (id: string) => {
    if (name === 'overview') {
      const tab = value.find((asset: GoalsFormAsset) => asset.id === id)

      setValue(
        name,
        value.filter((asset: GoalsFormAsset) => asset.id !== id)
      )

      setValue(tab.name, [])

      return
    }

    return setValue(
      name,
      value.filter((asset: GoalsFormAsset) => asset.id !== id)
    )
  }

  const addEmptySector = () => {
    setValue(name, [...value, { id: uuidv4(), name: '', value: 0 }])
  }

  const handleAssetPercentage = (e: Event, id: string) => {
    setValue(
      name,
      value.map((stock: GoalsFormAsset) =>
        stock.id === id
          ? { ...stock, value: (e.target as HTMLInputElement).value }
          : stock
      )
    )
  }

  const isComplete = () => {
    const sum = value.reduce((acc: number, curr: GoalsFormAsset) => {
      return parseInt(curr.value) + acc
    }, 0)
    return sum === 100
  }

  return {
    value,
    handleAssetSector,
    removeAssetSector,
    addEmptySector,
    handleAssetPercentage,
    isComplete
  }
}

export default useAssetSectors

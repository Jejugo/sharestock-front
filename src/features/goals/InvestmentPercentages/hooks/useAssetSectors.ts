import { useFormContext } from 'react-hook-form'
import { Sector, Option } from '../interfaces'
import { v4 as uuidv4 } from 'uuid'

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
        (stock: Sector) =>
          stock.name.toLowerCase() === option.name.toLowerCase()
      )
    ) {
      alert('Voce ja possui esse ativo!')
      return
    }
    setAssetType(
      value.filter((stock: Sector) => stock.id !== id),
      option,
      id,
      listIndex
    )
  }

  const removeAssetSector = (id: string) => {
    setValue(
      name,
      value.filter((stock: Sector) => stock.id !== id)
    )
  }

  const addEmptySector = () => {
    setValue(name, [...value, { id: uuidv4(), name: '', value: 0 }])
  }

  const handleAssetPercentage = (e: Event, id: string) => {
    setValue(
      name,
      value.map((stock: Sector) =>
        stock.id === id
          ? { ...stock, value: (e.target as HTMLInputElement).value }
          : stock
      )
    )
  }

  return {
    value,
    handleAssetSector,
    removeAssetSector,
    addEmptySector,
    handleAssetPercentage
  }
}

export default useAssetSectors

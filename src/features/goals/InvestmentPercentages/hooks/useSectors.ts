import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { deleteDropdownItem, setNewDropdownItem } from '../requests'
import { GoalsForm, Sector } from '../interfaces'
import { useAuth } from '@context/AuthUserContext'
import { UseFormReturn } from 'react-hook-form'
import { capitalizeFirstWord } from '@builders/strings'

type UseSectorsProps = Record<AssetTypes, Sector[]>
type UseSectorsReturn = {
  sectors: Record<AssetTypes, Sector[]>
  updateSector: (name: AssetTypes, updatedSector: Sector[]) => void
  removeDropdownItem: (id: string, name: AssetTypes) => Promise<void>
  onAddNewDropdownItem: (item: string, name: AssetTypes) => Promise<void>
}

export const useSectors = (
  initialSectors: UseSectorsProps,
  formMethods: UseFormReturn<GoalsForm, any>
): UseSectorsReturn => {
  const { authUser } = useAuth() as IAuthUserContext
  const { getValues, setValue } = formMethods

  const [sectors, setSectors] =
    useState<Record<AssetTypes, Sector[]>>(initialSectors)

  const updateSector = (name: AssetTypes, updatedSector: Sector[]) => {
    setSectors((prevSectors) => ({
      ...prevSectors,
      [name]: updatedSector
    }))
  }

  const removeDropdownItem = async (id: string, name: AssetTypes) => {
    try {
      await deleteDropdownItem({
        itemId: id,
        accessToken: authUser.accessToken,
        assetType: name
      })
      updateSector(
        name,
        sectors[name].filter((item) => item.id !== id)
      )

      const data = getValues()[name]
      setValue(
        name,
        data.filter((item) => item.id !== id)
      )
    } catch (err) {
      console.log('There was an error removing the dropdown item: ', err)
    }
  }

  const onAddNewDropdownItem = async (item: string, name: AssetTypes) => {
    const uniqueId = uuidv4()
    const newItem = capitalizeFirstWord(item)

    const sector = {
      id: uniqueId,
      name: newItem,
      default: false
    }

    try {
      await setNewDropdownItem(uniqueId, newItem, name, authUser.accessToken)
      updateSector(name, [...sectors[name], sector])
    } catch (err) {
      console.log('There was an error adding the item: ', err)
    }
  }

  return {
    sectors,
    updateSector,
    removeDropdownItem,
    onAddNewDropdownItem
  }
}

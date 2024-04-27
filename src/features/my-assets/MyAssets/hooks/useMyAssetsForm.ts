import { convertObjectToArray } from '@builders/arrays'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Firestore from 'firebase/Firestore'
import { useAuth } from '@context/AuthUserContext'
import { getAllAssetsByCategory } from '../firebase'

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const noStrategyTabs = (tabName: AssetTypes) =>
  ['bonds', 'international', 'crypto'].includes(tabName)

export default function useMyAssetsForm({
  initialState,
  tabName,
  asset,
  assetStrategyData,
  dropdownList,
  assetMap
}: {
  initialState: any
  asset: string | string[] | undefined
  tabName: AssetTypes
  assetStrategyData: any
  dropdownList: IDropdownItem[]
  assetMap?: any
}) {
  const { authUser } = useAuth() as IAuthUserContext
  const tabKey = noStrategyTabs(tabName) ? 'value' : 'quantity'

  const methods = useForm({
    defaultValues: initialState
  })

  const onSubmit = async (data: any) => {
    if (data[tabName].selectedAsset === '') {
      throw new Error('No asset selected')
    }

    if (!noStrategyTabs(tabName)) {
      try {
        await Firestore().setListByKey({
          id: authUser.uid,
          collection: `${tabName}Strategy`,
          list: [...data[tabName].statements],
          key: data[tabName].selectedAsset.value
        })
      } catch (err) {
        console.error('error saving to strategy firebase')
        return
      }
    }

    try {
      await Firestore().setDataByKey({
        id: authUser.uid,
        collection: `user${capitalizeFirstLetter(tabName)}`,
        list: [
          {
            ...(assetMap && assetMap[data[tabName].selectedAsset.value]),
            [tabKey]: Number(methods.getValues(tabName)[tabKey])
          }
        ],
        key: data[tabName].selectedAsset.value
      })
    } catch (err) {
      console.error('error saving to user firebase', err)
      return
    }

    alert('Data saved successfully')
  }

  useEffect(() => {
    const getInitialData = async () => {
      if (
        assetStrategyData?.[tabName]?.length &&
        asset &&
        typeof asset === 'string'
      ) {
        const tabKey = noStrategyTabs(tabName) ? 'value' : 'quantity'

        const formattedData = convertObjectToArray<IStatement>(
          assetStrategyData[tabName]
        )

        const selectedItem = dropdownList.find(
          (item: IDropdownItem) =>
            item.value.toLowerCase() === asset?.toLowerCase()
        )

        const assets = await getAllAssetsByCategory(tabName, authUser)

        const quantity = selectedItem
          ? assets?.[selectedItem?.value]?.quantity
          : ''

        methods.reset({
          [tabName]: {
            selectedAsset: selectedItem
              ? {
                  value: selectedItem.value,
                  label: selectedItem.label
                }
              : {},
            [tabKey]: quantity,
            statements: formattedData
          }
        })
      }
    }

    getInitialData()
  }, [assetStrategyData, asset])

  return {
    methods,
    onSubmit
  }
}

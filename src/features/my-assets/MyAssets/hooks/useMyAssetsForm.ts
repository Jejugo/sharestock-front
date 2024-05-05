import { convertObjectToArray } from '@builders/arrays'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Firestore from 'firebase/Firestore'
import { useAuth } from '@context/AuthUserContext'
import { getAllAssetsByCategory } from '../firebase'
import { enqueueSnackbar } from 'notistack'

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const strategyTabs = (tabName: AssetTypes) =>
  ['stocks', 'reits'].includes(tabName)

export default function useMyAssetsForm({
  initialState,
  tabName,
  asset,
  assetStrategyData,
  dropdownList,
  assetMap
}: {
  initialState: any
  asset?: string | string[] | undefined
  tabName: AssetTypes
  assetStrategyData: any
  dropdownList: IDropdownItem[]
  assetMap?: any
}) {
  const { authUser } = useAuth() as IAuthUserContext
  const tabKey = strategyTabs(tabName) ? 'quantity' : 'value'

  const methods = useForm({
    defaultValues: initialState
  })

  const onSubmit = async (data: any) => {
    if (data[tabName].selectedAsset === '') {
      throw new Error('No asset selected')
    }

    if (strategyTabs(tabName)) {
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

    enqueueSnackbar('Dados salvos com sucesso!', {
      variant: 'success',
      preventDuplicate: true
    })
  }

  useEffect(() => {
    const getInitialData = async () => {
      let statementsData: IStatement[] = []
      let selectedItem: IDropdownItem | undefined
      let quantity: string | undefined

      if (assetStrategyData?.[tabName]?.length) {
        statementsData = convertObjectToArray<IStatement>(
          assetStrategyData[tabName]
        )
      }

      if (asset && typeof asset === 'string') {
        selectedItem = dropdownList.find(
          (item: IDropdownItem) =>
            item.value.toLowerCase() === asset?.toLowerCase()
        )

        const assets = await getAllAssetsByCategory(tabName, authUser)

        quantity = selectedItem ? assets?.[selectedItem?.value]?.quantity : ''
      }

      methods.reset({
        [tabName]: {
          selectedAsset: selectedItem
            ? {
                value: selectedItem.value,
                label: selectedItem.label
              }
            : {},
          [tabKey]: quantity,
          statements: statementsData
        }
      })
    }

    getInitialData()
  }, [assetStrategyData, asset])

  return {
    methods,
    onSubmit
  }
}

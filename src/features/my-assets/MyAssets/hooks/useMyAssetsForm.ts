import { convertObjectToArray } from 'builders/arrays'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Firestore from 'firebase/Firestore'
import { useAuth } from 'context/AuthUserContext'

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default function useMyAssetsForm({
  initialState,
  tabName,
  assetStrategyData,
  assetMap
}: {
  initialState: any
  tabName: AssetTypes
  assetStrategyData: any
  assetMap?: any
}) {
  const { authUser } = useAuth() as IAuthUserContext
  const tabKey =
    tabName === 'bonds' || tabName === 'international' || tabName === 'crypto'
      ? 'value'
      : 'quantity'

  const methods = useForm({
    defaultValues: initialState || {
      [tabName]: {
        statements: [],
        selectedAsset: '',
        [tabKey]: ''
      }
    }
  })

  const onSubmit = async (data: any) => {
    if (
      tabName !== 'bonds' &&
      tabName !== 'international' &&
      tabName !== 'crypto'
    ) {
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
    methods.reset()
  }

  useEffect(() => {
    if (assetStrategyData?.[tabName]?.length) {
      const formattedData = convertObjectToArray<IStatement>(
        assetStrategyData[tabName]
      )

      methods.reset({
        [tabName]: {
          selectedAsset: '',
          [tabKey]: '',
          statements: formattedData
        }
      })
    }
  }, [assetStrategyData])

  return {
    methods,
    onSubmit
  }
}

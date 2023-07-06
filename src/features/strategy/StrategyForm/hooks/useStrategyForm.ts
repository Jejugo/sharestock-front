import Firestore from 'firebase/Firestore'
import { useEffect } from 'react'
import { formatSubmitData, formatGetData } from '../utils'
import { useAuth } from 'context/AuthUserContext'
import { useForm } from 'react-hook-form'
import initialFormState, { IStrategyForm } from '../initialFormValues'
import { convertObjectKeysToList } from 'builders/arrays'

export default function useStrategyForm() {
  const { authUser } = useAuth() as IAuthUserContext

  const methods = useForm<IStrategyForm>({
    defaultValues: initialFormState
  })

  /**
   * Calls Firestore to set data for user strategy collection with formatted submit data.
   * Alerts user of successful strategy save.
   *
   * @param {any} data - the data to be submitted
   * @return {Promise<void>} - a promise that resolves when data has been set
   */
  const onSubmit = async (data: any) => {
    await Firestore().setData({
      collection: 'userStrategy',
      id: authUser.uid,
      item: formatSubmitData(data)
    })

    alert('Estratégia salva com sucesso!')
  }
  /**
   * Deletes an item from a given Firestore collection and userStrategy.
   *
   * @param {React.MouseEvent<HTMLElement>} e - The mouse event that triggered this function.
   * @param {number} index - The index of the item to delete.
   * @param {string} statement - The statement of the item to delete.
   * @param {Partial<AssetTypes> | string} name - The name of the Firestore collection
   * or a Partial<AssetTypes> object.
   * @return {Promise<void>} A promise that resolves when the item has been successfully deleted.
   */
  const onDeleteItem = async (
    e: React.MouseEvent<HTMLElement>,
    index: number,
    statement: string,
    name: Partial<AssetTypes>
  ) => {
    //@ts-ignore
    const values = methods.getValues()[name]

    if (confirm('Tem certeza que deseja excluir esse item da sua base?')) {
      if (authUser) {
        try {
          const data = await Firestore().getData({
            collection: `${name}Strategy`,
            id: authUser.uid
          })
          await Promise.all([
            await checkAssetByAssetForDifferenceAndRemove(
              data,
              statement,
              name
            ),
            await Firestore().removeArrayItemFromFirestoreKeyByIndex({
              collection: 'userStrategy',
              id: authUser.uid,
              index: index,
              key: name
            })
          ])
          methods.setValue(name as any, {
            ...values,
            statements: values.statements.filter(
              (_: IStatement, i: number) => index !== i
            )
          })
        } catch (err) {
          console.error(
            `There was en error deleting from ${name}Strategy and userStrategy: ${err}`
          )
        }
      }
    }
  }

  const checkAssetByAssetForDifferenceAndRemove = async (
    data: any,
    statementToRemove: string,
    name: Partial<AssetTypes>
  ) => {
    let newState = {}
    const convertedData = convertObjectKeysToList(data)

    try {
      // loop over each asset
      Object.entries(convertedData).map(([key, value]: [string, any]) => {
        // get asset from firebase
        const newValue = value.filter(
          (statement: IStatement) =>
            statement.statement.toLowerCase() !==
            statementToRemove.toLowerCase()
        )
        newState = {
          ...convertedData,
          [key]: {
            ...newValue
          }
        }
      })

      await Firestore().setData({
        collection: `${name}Strategy`,
        id: authUser.uid,
        item: newState
      })
    } catch (err) {
      if (err instanceof Error)
        console.error(
          `There was an error removing from firestore: ${err.message}`
        )
    }
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      // Fetch initial data from Firestore
      const data = await Firestore().getData({
        collection: 'userStrategy',
        id: authUser.uid
      })

      if (data) {
        // If data exists, format it and reset the form with the data
        const formattedData = formatGetData(data)
        methods.reset(formattedData)
      }
    }

    fetchInitialData()
  }, []) // Empty dependencies array means this effect runs once when the component mounts

  return {
    methods,
    onSubmit,
    onDeleteItem
  }
}

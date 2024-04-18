import Firestore from 'firebase/Firestore'
import { useEffect, useState } from 'react'
import { formatSubmitData, formatGetData } from '../utils'
import { useAuth } from '@context/AuthUserContext'
import { useForm } from 'react-hook-form'
import initialFormState, { IStrategyForm } from '../initialFormValues'

export default function useStrategyForm() {
  const { authUser } = useAuth() as IAuthUserContext
  const [isLoading, setIsLoading] = useState(false)

  const methods = useForm<IStrategyForm>({
    defaultValues: initialFormState
  })
  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true)
      await Firestore().setData({
        collection: 'userStrategy',
        id: authUser.uid,
        item: formatSubmitData(data)
      })
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }

    alert('Estratégia salva com sucesso!')
  }

  const onDeleteItem = async (
    e: React.MouseEvent<HTMLElement>,
    index: number,
    statement: string,
    name: 'stocks' | 'reits'
  ) => {
    const values = methods.getValues()[name]

    if (authUser) {
      try {
        setIsLoading(true)
        methods.setValue(name as AssetTypes, {
          ...values,
          statements: values.statements.filter(
            (_: IStatement, i: number) => index !== i
          )
        })
      } catch (err) {
        console.error(
          `There was en error deleting from ${name}Strategy and userStrategy: ${err}`
        )
      } finally {
        setIsLoading(false)
      }
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
  }, [])

  return {
    methods,
    onSubmit,
    onDeleteItem,
    isLoading
  }
}

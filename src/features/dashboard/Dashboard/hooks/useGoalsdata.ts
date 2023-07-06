import React, { useEffect, useState } from 'react'
import Firestore from 'firebase/Firestore'
import { useAuth } from 'context/AuthUserContext'
import { sortArrayAlphabetically } from 'builders/arrays'

interface IUseGoalsData {
  bonds: { id: number; name: string; value: number }[]
  international: { id: number; name: string; value: number }[]
  overview: { id: number; name: string; value: number }[]
  reits: { id: number; name: string; value: number }[]
  stocks: { id: number; name: string; value: number }[]
}

export default function useGoalsdata() {
  const [goals, setGoals] = useState<IUseGoalsData>({} as IUseGoalsData)
  const { authUser } = useAuth()

  useEffect(() => {
    const getFirestoreData = async () => {
      const data = await Firestore().getData({
        collection: 'goals',
        id: authUser.uid
      })
      setGoals(data)
    }

    getFirestoreData().catch((err) => console.error(err))
  }, [])

  return {
    stocks: goals.stocks && sortArrayAlphabetically(goals.stocks, 'name'),
    reits: goals.reits && sortArrayAlphabetically(goals.reits, 'name'),
    international:
      goals.international &&
      sortArrayAlphabetically(goals.international, 'name'),
    bonds: goals.bonds && sortArrayAlphabetically(goals.bonds, 'name'),
    overview: goals.overview && sortArrayAlphabetically(goals.overview, 'name')
  }
}

import React, { useEffect, useState } from 'react'
import Firestore from 'firebase/Firestore'
import { useAuth } from 'context/AuthUserContext'
import { sortArrayAlphabetically } from 'builders/arrays'
import { IGoal } from '../Dashboard'

interface IUseGoalsData {
  bonds: IGoal[]
  international: IGoal[]
  overview: IGoal[]
  reits: IGoal[]
  stocks: IGoal[]
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

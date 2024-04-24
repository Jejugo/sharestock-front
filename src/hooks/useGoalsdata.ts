import React, { useEffect, useState } from 'react'
import Firestore from 'firebase/Firestore'
import { useAuth } from '@context/AuthUserContext'
import { sortArrayAlphabetically } from '@builders/arrays'

export default function useGoalsdata() {
  const [goals, setGoals] = useState<any>({} as any)
  const { authUser } = useAuth()

  useEffect(() => {
    const getFirestoreData = async () => {
      const data = await Firestore().getData({
        collection: 'goals',
        id: authUser.uid
      })

      const formattedGoals = Object.keys(data).reduce((acc: any, curr: any) => {
        return {
          ...acc,
          ...(data[curr].length
            ? {
                [curr]:
                  data[curr] && sortArrayAlphabetically(data[curr], 'name')
              }
            : {})
        }
      }, {})

      setGoals(formattedGoals)
    }

    getFirestoreData().catch((err) => console.error(err))
  }, [])

  return goals
}

import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

interface User {
  uid: string
  email: string
}

type AuthUser = User

const formatAuthUser = (user: AuthUser): User => ({
  uid: user.uid,
  email: user.email
})

export default function useFirebaseAuth() {
  const auth = getAuth()
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const authStateChanged = async (authState: any) => {
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
      return
    }

    setLoading(true)
    const formattedUser = formatAuthUser(authState)
    setAuthUser(formattedUser)
    setLoading(false)
  }

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged)
    return () => unsubscribe()
  }, [])

  return {
    authUser,
    loading
  }
}

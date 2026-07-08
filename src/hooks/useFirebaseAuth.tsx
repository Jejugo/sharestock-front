import { useState, useEffect } from 'react'
import { User, getAuth, onAuthStateChanged } from 'firebase/auth'
import initFirebase from '../firebase'

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    initFirebase()
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, async (authState) => {
      if (!authState) {
        setAuthUser(null)
        setLoading(false)
        return
      }

      setAuthUser(authState)
      setLoading(false)

      const accessToken = await auth.currentUser?.getIdToken()
      if (accessToken) {
        document.cookie = `accessToken=${accessToken};max-age=3600;path=/`
      }
    })

    return () => unsubscribe()
  }, [])

  return {
    authUser,
    loading
  }
}

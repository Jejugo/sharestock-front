import { useState, useEffect } from 'react'
import {
  NextOrObserver,
  User,
  getAuth,
  onAuthStateChanged
} from 'firebase/auth'

export default function useFirebaseAuth() {
  const auth = getAuth()
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const authStateChanged = async (
    authState: NextOrObserver<User>
  ): Promise<void> => {
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
      return
    }

    setAuthUser(authState as any)
    setLoading(false)

    const accessToken = await auth.currentUser?.getIdToken()
    if (accessToken) {
      // Save the access token to a cookie
      document.cookie = `accessToken=${accessToken};max-age=3600;path=/`
    }
  }

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged as any)
    return () => unsubscribe()
  }, [])

  return {
    authUser,
    loading
  }
}

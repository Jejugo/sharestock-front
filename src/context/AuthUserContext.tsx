import React, { createContext, useContext, useEffect } from 'react'
import useFirebaseAuth from '@hooks/useFirebaseAuth'
import { useRouter } from 'next/router'

const initialState: IAuthUserContext = {
  authUser: null,
  loading: true
}

const AuthUserContext = createContext(initialState)

function Unauthenticated() {
  const { authUser, loading } = useFirebaseAuth()
  const { push } = useRouter()

  useEffect(() => {
    setTimeout(() => {
      if (!authUser && !loading) {
        push('/login')
      }
    }, 1000)
  }, [authUser, loading])

  useEffect(() => {
    const storeAccessTokenCookie = async () => {
      if (authUser) {
        const accessToken = await authUser.getIdToken()

        console.log('Token will expire in: 3600 seconds')
        document.cookie = `accessToken=${accessToken};max-age=3600;path=/`
      }
    }

    storeAccessTokenCookie()
  }, [authUser])

  return <div>{!authUser && !loading && 'Unauthenticated... Redirecting'}</div>
}

const allowUnauthenticated = ['/login', '/signup']

export function AuthUserProvider({ children }: { children: React.ReactNode }) {
  const { authUser, loading } = useFirebaseAuth()
  const { pathname } = useRouter()
  return (
    <AuthUserContext.Provider value={{ authUser, loading }}>
      {authUser || allowUnauthenticated.includes(pathname) ? (
        children
      ) : (
        <Unauthenticated />
      )}
    </AuthUserContext.Provider>
  )
}
// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(AuthUserContext)

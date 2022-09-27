import { createContext, useContext, useState, useEffect } from 'react';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import { useRouter } from 'next/router';

const AuthUserContext = createContext({
  authUser: null,
  loading: true,
});

function Unauthenticated() {
  const { authUser, loading } = useFirebaseAuth();
  const { push } = useRouter();

  useEffect(() => {
    setTimeout(() => {
      if (!authUser && !loading) {
        push('/login');
      }
    }, 1000);
  }, [authUser, loading]);

  return <div>{!authUser && !loading && 'Unauthenticated... Redirecting'}</div>;
}

export function AuthUserProvider({ children }) {
  const { authUser, authLoading } = useFirebaseAuth();
  const { pathname } = useRouter();

  return (
    <AuthUserContext.Provider value={{ authUser, authLoading }}>
      {authUser || pathname === '/login' ? children : <Unauthenticated />}
    </AuthUserContext.Provider>
  );
}
// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(AuthUserContext);

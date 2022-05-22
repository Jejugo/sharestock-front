import { createContext, useContext, Context, useEffect } from "react";
import Router from 'next/router'
import useFirebaseAuth from "../hooks/useFirebaseAuth";

const AuthUserContext = createContext({
  authUser: null,
  loading: true,
});

export function AuthUserProvider({ children }) {
  const { authUser, authLoading } = useFirebaseAuth();
  useEffect(() => {
    const router = Router
    console.log(authUser);
    //if(!authUser) router.push('/login')
  }, [authUser])
  return (
    <AuthUserContext.Provider value={{authUser, authLoading}}>
      {children}
    </AuthUserContext.Provider>
  );
}
// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(AuthUserContext);


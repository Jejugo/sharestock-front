import { createContext, useContext, Context, useEffect } from "react";
import useFirebaseAuth from "../hooks/useFirebaseAuth";

const AuthUserContext = createContext({
  authUser: null,
  loading: true,
});

export function AuthUserProvider({ children }) {
  const { authUser, authLoading } = useFirebaseAuth();

  return (
    <AuthUserContext.Provider value={{authUser, authLoading}}>
      {children}
    </AuthUserContext.Provider>
  );
}
// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(AuthUserContext);


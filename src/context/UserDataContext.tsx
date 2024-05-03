import React, { useState, createContext, useContext, useEffect } from 'react'

interface UserData {
  showMoneyInvested: boolean
}

interface UserDataContextValue {
  userData: UserData
  setShowMoneyInvested: (value: boolean) => void
}

const UserDataContext = createContext<UserDataContextValue>({
  userData: { showMoneyInvested: true },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setShowMoneyInvested: () => {}
})

export const useUserDataContext = (): UserDataContextValue =>
  useContext(UserDataContext)

export const UserDataProvider = ({ children }: React.PropsWithChildren) => {
  const [userData, setUserData] = useState<UserData>({} as UserData)

  useEffect(() => {
    const storedData = sessionStorage.getItem('showMoneyInvested')
    const initialData = {
      showMoneyInvested: storedData ? JSON.parse(storedData) : true
    }

    setUserData(initialData)
  }, [])

  const setShowMoneyInvested = (value: boolean) => {
    setUserData((prevState) => {
      const newState = { ...prevState, showMoneyInvested: value }
      sessionStorage.setItem('showMoneyInvested', JSON.stringify(value))
      return newState
    })
  }

  const contextValue: UserDataContextValue = {
    userData,
    setShowMoneyInvested
  }

  return (
    <UserDataContext.Provider value={contextValue}>
      {children}
    </UserDataContext.Provider>
  )
}

import React, { useState, useEffect } from 'react'
import { signOut, getAuth } from '@firebase/auth'
import navbarConfig, { INavbarItem } from '@const/navbarConfig'
import * as S from './styles'
import Router from 'next/router'
import { useAuth } from '@context/AuthUserContext'
import CloseIcon from '@mui/icons-material/Close'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

interface INavbar {
  isNavbarOpen: boolean
  setIsNavbarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar = ({ isNavbarOpen, setIsNavbarOpen }: INavbar) => {
  const [loggedUser, setLoggedUser] = useState<string>('')
  const { authUser } = useAuth() as IAuthUserContext
  const auth = getAuth()

  const handleSignout = async () => {
    await signOut(auth)
    const router = Router
    router.push('/login')
  }

  useEffect(() => {
    if (authUser) setLoggedUser(authUser.email)
  }, [authUser])

  return (
    <section>
      <S.Navigation isNavbarOpen={isNavbarOpen}>
        <S.NavigationIcon
          onClick={() => setIsNavbarOpen((previousState) => !previousState)}
        >
          {isNavbarOpen ? <CloseIcon /> : <MenuOpenIcon />}
        </S.NavigationIcon>

        <S.NavbarItemList>
          {loggedUser ? (
            <>
              <S.NavbarItem>
                <a
                  href="#"
                  className="navbar__item_link"
                  onClick={handleSignout}
                >
                  <ExitToAppIcon />
                  <S.NavbarItemText>
                    {isNavbarOpen && 'Signout'}
                  </S.NavbarItemText>
                </a>
              </S.NavbarItem>
            </>
          ) : (
            <>
              <S.NavbarItem>
                <a href="/login" className="navbar__item_link">
                  Login
                </a>
              </S.NavbarItem>
              <S.NavbarItem>
                <a href="/signup" className="navbar__item_link">
                  Signup
                </a>
              </S.NavbarItem>
            </>
          )}
        </S.NavbarItemList>
        <S.NavbarItemList>
          {navbarConfig.map((item: INavbarItem, index: number) => (
            <S.NavbarItem key={index}>
              <a href={item.href} key={index}>
                <S.NavbarItemWrap>
                  {React.createElement(item.icon)}
                  <S.NavbarItemText>
                    {isNavbarOpen && item.text}
                  </S.NavbarItemText>
                </S.NavbarItemWrap>
              </a>
            </S.NavbarItem>
          ))}
        </S.NavbarItemList>
      </S.Navigation>
    </section>
  )
}
export default Navbar

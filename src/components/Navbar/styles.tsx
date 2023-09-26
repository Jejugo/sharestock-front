import styled from 'styled-components'
import { INavigation } from './interfaces'

export const Navigation = styled.nav<INavigation>`
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  width: ${(props) => (props.isNavbarOpen ? '200px' : '60px')};
  padding: 20px 0;
  background-color: #222;
  display: flex;
  flex-direction: column;
  transition: 0.5s ease;
  overflow: auto;
  z-index: 999;

  a {
    color: #fff;
  }
`

export const NavigationIcon = styled.div`
  color: black;
  text-align: center;
  margin: 20px;

  a {
    color: #fff;
  }
`

export const NavbarItemList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  margin-bottom: 10%;
  padding: 0;
`

export const NavbarItem = styled.li`
  flex-basis: auto;
  margin: 0px 0px 20px 0px;
  font-size: 20px;
  text-align: center;

  a {
    text-decoration: none;
    text-align: center;
  }

  h4 {
    margin: 10px;
  }
`

export const NavbarItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    color: grey;
  }
`

export const NavbarItemText = styled.p`
  margin: 10px 0;
  font-weight: 300;
`

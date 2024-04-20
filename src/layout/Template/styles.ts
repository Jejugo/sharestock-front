import styled from 'styled-components'
import { IContent } from './interfaces'

export const Content = styled.section<IContent>`
  margin-left: ${(props) => (props.isNavbarOpen ? '200px' : '60px')};
  transition: 0.5s ease;
`

export const Main = styled.main`
  margin: 0 auto 0 auto;
  height: 100vh;
`

export const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`

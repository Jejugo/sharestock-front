import styled from 'styled-components'
import { IWishListStyle } from './interfaces'

export const WishList = styled.div<IWishListStyle>`
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: #eee;
  max-height: 250px;
  overflow-y: auto;
  width: 200px;
  transition: 0.5s ease;
  list-style: none;
  padding: 10px 0;
  margin: 0;

  ${(props) => !props.visible && 'opacity: 0;'}
`

export const WishListTitle = styled.li`
  color: black;
  padding: 10px;
  margin: 0;
`

export const WishListText = styled.p`
  color: black;
  padding: 5px;
  margin: 0;
`

export const WishListTextWrapper = styled.li`
  display: flex;
  justify-content: space-between;
`

export const Button = styled.button`
  position: fixed;
  bottom: 0;
  right: 0;
  color: blue;
  padding: 10px;
  width: 200px;
  cursor: pointer;
`

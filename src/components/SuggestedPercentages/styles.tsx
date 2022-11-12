import { isAbsolute } from 'node:path/win32'
import { RefObject } from 'react'
import styled from 'styled-components'

export const ScoreView = styled.div`=
  background-color: green;
  width: 80%;
  margin: 0 auto;
  height: 60px;
  display: flex;
`

export const Points = styled.div`
  background-color: ${(props) => props.color};
  height: 100%;
  width: 100%;
  z-index: 2;
`

export const SuggestedPercentages = styled.section`
  height: 80vh;
  margin: 10% 0;
`

export const BigTitle = styled.h1`
  font-family: 'Amatic SC', cursive;
  margin: 15px 0;
  font-size: 26px;
  text-align: center;
  color: white;
`

export const Title = styled.h1`
font-family: 'Amatic SC', cursive;
  margin: 15px 0;
  font-size: 18px;
  text-align: center;
  color: white;
`

export const SuggestedListWrapper = styled.table`
  width: 80%;
  margin: 0 auto;
`

export const SuggestedList = styled.td`
  position: relative;
  display: flex;
  justify-content: space-between;
  color: white;
  margin: 20px 0;
  background-color: #1e1e1e;
  padding: 2px 10px;
  border-radius: 5px;
  padding: 20px 60px;
  &:hover {
    background-color: grey;
  }
`

export const SuggestedListItem = styled.tr`
  flex-basis: 20%;
  padding: 5px 0px;
`

export const SuggestedListItemInput = styled.input`
  flex-basis: 20%;
  background-color: transparent;
  color: white;
  font-size: 16px;
  border: none;
  padding: 5px 0px;
`

export const DeleteIcon = styled.div`
  cursor: pointer;
  position: absolute;
  right: 20px;
`

export const SaveButton = styled.div`
  padding: 20px 30px;
  background-color: #ffcd00;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  width: 150px;
  color: black;
  margin: 0 auto;

  &:hover {
    background-color: grey;
    color: white;
    transition: 0.2s ease;
  }
`

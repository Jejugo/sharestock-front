import styled from 'styled-components'
import Flex from '@components/container/Flex/Flex'
import { spacings } from '@styles/constants'

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`

export const DropdownButton = styled.button`
  background-color: #333; /* Tonalidade chumbo */
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  width: 100%;
`

export const DropdownContent = styled.div`
  display: block;
  position: absolute;
  background-color: #222;
  min-width: 160px;
  z-index: 1;
  width: calc(100% - 2px);
  max-height: 300px;
  overflow-y: scroll;
  border: 1px solid #333;
  border-radius: 0px 0px 10px 10px;
`

export const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 5px;
  box-sizing: border-box;
  background-color: #555;
  border: none;
  outline: none;
  color: #eee;
`

export const InputWrapper = styled(Flex)`
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacings.xsmall}px;
`

export const OptionDiv = styled.li`
  padding: 10px;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: #ddd;
    color: #000;
  }
`

export const LoadingIcon = styled.div`
  padding: 10px;
  text-align: center;
`

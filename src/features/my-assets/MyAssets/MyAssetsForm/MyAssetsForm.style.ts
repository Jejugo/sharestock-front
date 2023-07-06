import styled from 'styled-components'
import { colors } from 'styles/constants'

export const AddAssetBtn = styled.button`
  padding: 20px 30px;
  background-color: #ffcd00;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  margin-left: 20px;
`

export const StatusInvestBtn = styled.button`
  padding: 15px 30px;
  margin: 0;
  background-color: ${colors.blue};
  color: white;
  font-weight: 500;
  cursor: pointer;
  border: none;
  text-decoration: none;
  border-radius: 5px;
`

export const AddCompanyInput = styled.input`
  display: block;
  padding: 10px;
  margin: 20px 0px;
  border: none;
  border-radius: 2px;
`

export const TopActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0px;
`

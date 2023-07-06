import styled from 'styled-components'

export const InputWrapper = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  font-weight: 400;
  width: 100%;
  &:focus {
    outline: none;
    border-color: #0074d9;
    box-shadow: 0 0 5px #0074d9;
  }
`

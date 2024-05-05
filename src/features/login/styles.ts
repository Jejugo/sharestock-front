import styled from 'styled-components'

export const Login = styled.form`
  width: 40%;
  height: 50%;
  margin: 0 auto;
  position: relative;
  top: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const LoginTitle = styled.h1`
  text-align: center;
  font-size: 30px;
`

export const LoginInputWrapper = styled.div`
  width: 100%;
  height: 30px;
  margin: 10px 0;
  outline: none;
  border: none;
`

export const LoginInput = styled.input`
  width: 100%;
  padding: 5px;
  font-size: 20px;
`

export const LoginSubmit = styled.button`
  margin: 10px 0 0 0;
  padding: 5px 15px;
  border: 0;
  border-radius: 5px;
`

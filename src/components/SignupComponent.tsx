import React, { useState } from 'react'
import { createUserWithEmailAndPassword, getAuth } from '@firebase/auth'
import Router from 'next/router'
import styled from 'styled-components'

const Container = styled.form`
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

const Title = styled.h1`
  text-align: center;
  font-size: 30px;
`

const Input = styled.input`
  width: 100%;
  padding: 5px;
  font-size: 20px;
  margin: 10px 0;
`

const Submit = styled.button`
  margin: 10px 0 0 0;
  padding: 5px 15px;
  font-size: 16px;
  border: 0;
  border-radius: 5px;
`

const SignupComponent = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const auth = getAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)
      if (user) Router.push('/')
    } catch (err) {
      console.error('Error: ', err)
    }
  }

  return (
    <Container onSubmit={handleSubmit}>
      <Title>Sign up</Title>
      <Input
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Digite sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        placeholder="Digite seu Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Submit type="submit">Registrar</Submit>
    </Container>
  )
}

export default SignupComponent

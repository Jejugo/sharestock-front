import React, { useState } from 'react'
import { signInWithEmailAndPassword, getAuth } from '@firebase/auth'
import Router from 'next/router'
import * as S from './styles'

const LoginComponent = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const router = Router
      const auth = getAuth()
      const user = await signInWithEmailAndPassword(auth, email, password)
      if (user) router.push('/')
    } catch (err) {
      if (err instanceof Error)
        console.error('Couldnt sign you in: ', err.message)
      else console.error(err)
    }
  }

  return (
    <S.Login onSubmit={handleSubmit}>
      <S.LoginTitle>Login</S.LoginTitle>
      <S.LoginInputWrapper>
        <S.LoginInput
          value={email}
          onChange={(e) => setEmail(() => e.target.value)}
          placeholder="Digite seu email"
          type="email"
        ></S.LoginInput>
      </S.LoginInputWrapper>
      <S.LoginInputWrapper>
        <S.LoginInput
          value={password}
          onChange={(e) => setPassword(() => e.target.value)}
          placeholder="Digite sua senha"
          type="password"
        ></S.LoginInput>
      </S.LoginInputWrapper>
      <S.LoginSubmit type="submit">Enviar</S.LoginSubmit>
    </S.Login>
  )
}

export default LoginComponent

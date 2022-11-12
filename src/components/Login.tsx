import React, { useState } from 'react'
import { signInWithEmailAndPassword, getAuth } from '@firebase/auth'
import Router from 'next/router'

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
    <form className="login" onSubmit={handleSubmit}>
      <h1 className="login__title">Login</h1>
      <div className="login__input">
        <input
          className="login__input_value"
          value={email}
          onChange={(e) => setEmail(() => e.target.value)}
          placeholder="Digite seu email"
          type="email"
        ></input>
      </div>
      <div className="login__input">
        <input
          className="login__input_value"
          value={password}
          onChange={(e) => setPassword(() => e.target.value)}
          placeholder="Digite sua senha"
          type="password"
        ></input>
      </div>
      <button className="submit" type="submit">
        Enviar
      </button>
      <style jsx global>{`
        .login__title {
          text-align: center;
          font-size: 30px;
        }
        .login {
          width: 40%;
          height: 50%;
          margin: 0 auto;
          position: relative;
          top: 15%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .login__input {
          width: 100%;
          height: 30px;
          margin: 10px 0;
          outline: none;
          border: none;
        }

        .login__input_value {
          width: 100%;
          padding: 5px;
          font-size: 20px;
        }

        .submit {
          margin: 10px 0 0 0;
          padding: 5px 15px;
          font-size: 16px;
          border: 0;
          border-radius: 5px;
        }
      `}</style>
    </form>
  )
}

export default LoginComponent

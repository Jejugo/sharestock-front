import { useState } from "react";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
      e.preventDefault()
      console.log('enviando dados...')
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <div className="login__input">
        <input
          className="login__input_value"
          value={email}
          onChange={(e) => setEmail(() => e.target.value)}
          placeholder="Digite seu email"
        ></input>
      </div>
      <div className="login__input">
        <input
          className="login__input_value"
          value={password}
          onChange={(e) => setPassword(() => e.target.value)}
          placeholder="Digite sua senha"
        ></input>
      </div>
      <button type="submit">Enviar</button>
      <style jsx global>{`
        .login {
          width: 40%;
          height: 50%;
          margin: 0 auto;
          position: relative;
          top: 20%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .login__input{
            width: 50%;
            height: 30px;
            margin: 5px 0;
        }

        .login__input_value {
            width: 100%;
            font-size: 20px;
        }
      `}</style>
    </form>
  );
};

export default LoginComponent;

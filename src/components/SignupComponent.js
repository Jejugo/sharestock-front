import { useState } from "react";
import { auth } from "../firebase"
import { createUserWithEmailAndPassword, getAuth } from "@firebase/auth";

const SignupComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
      // e.preventDefault()
      // try{
      //   const user = await createUserWithEmailAndPassword(auth, email, password)
      //   if(user)
      //     router.push('/')
      // }
      // catch(err){
      //   alert("Error: ", err.message)
      // }
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h1 className="signup__title">Sign up</h1>
      <div className="signup__input">
        <input
          className="signup__input_value"
          value={email}
          onChange={(e) => setEmail(() => e.target.value)}
          placeholder="Digite seu email"
        ></input>
      </div>
      <div className="signup__input">
        <input
          className="signup__input_value"
          value={password}
          onChange={(e) => setPassword(() => e.target.value)}
          placeholder="Digite sua senha"
        ></input>
      </div>
      <button className="submit" type="submit">Registrar</button>
      <style jsx global>{`
        .signup__title{
          text-align: center;
          font-size: 30px;
        }
        .signup {
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

        .signup__input{
            width: 50%;
            height: 30px;
            margin: 10px 0;
        }

        .signup__input_value {
            width: 100%;
            padding: 5px;
            font-size: 20px;
        }

        .submit{
          margin: 10px 0 0 0;
        }
      `}</style>
    </form>
  );
};

export default SignupComponent;

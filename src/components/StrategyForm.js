import React, { useState, useEffect } from "react";

export default function StrategyForm() {
  const [statements, setStatements] = useState([]);
  const [weights, setWeights] = useState([]);
  const [inputStatement, setInputStatement] = useState("");
  const [inputWeight, setInputWeight] = useState("");

  const addStatement = () => {
    setStatements((prevState) => [...prevState, inputStatement]);
    setWeights((prevState) => [...prevState, inputWeight]);
  };    

  const removeStatement = (e, statement, index) => {
    setStatements((prevState) => [
      ...prevState.filter((item) => item !== statement),
    ]);
    setWeights((prevState) => [...prevState.filter((item, i) => index !== i)]);
  };

  const storeStatements = () => {
      console.log('storing...')
  }

  const handleInputStatement = (e) => setInputStatement(e.target.value);

  const handleInputWeight = (e) => {
      if(e.target.validity.valid) setInputWeight(e.target.value)
  }

  useEffect(() => {}, [statements]);
  return (
    <section className="strategy-form">
      <h1> Defina sua estratégia </h1>
      <p>
        <i>
          Crie afirmações defensivas e estipule um peso para cada uma delas:
        </i>
      </p>
      <input
        type="text"
        onChange={handleInputStatement}
        value={inputStatement}
        placeholder="Digite sua afirmação"
      ></input>
      <input
        type="text"
        onChange={handleInputWeight}
        value={inputWeight}
        pattern="[0-9]*"
        placeholder="Defina o peso"
      ></input>
      <button onClick={() => addStatement()}>Adicionar</button>
      <ul>
        {statements.map((statement, index) => (
          <div>
            <li>
              {
              `Afirmação: ${statement}. 
              Peso: ${weights[index]}.`
              }
              <span onClick={(e) => removeStatement(e, statement, index)}>
                {" "}
                -
                {" "}
              </span>
            </li>
          </div>
        ))}
      </ul>
      {
        statements && statements.length > 0 && (
            <button onClick={storeStatements}>
                Salvar
            </button>
        )
      }
    </section>
  );
}

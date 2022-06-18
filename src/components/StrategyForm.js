import React, { useState, useEffect } from "react";
import StockCheckList from "./StockCheckList";
export default function StrategyForm() {
  const [statements, setStatements] = useState([]);
  const [inputStatement, setInputStatement] = useState("");
  const [inputWeight, setInputWeight] = useState("");
  const [showStockCheckList, setShowStockCheckList] = useState(false);

  const addStatement = () => {
    setStatements((prevState) => [
      ...prevState,
      {
        statement: inputStatement,
        weight: inputWeight,
        checked: false,
      },
    ]);
  };

  const removeStatement = (e, statement, index) => {
    setStatements((prevState) => [
      ...prevState.filter((item, i) => index !== i),
    ]);
  };

  const storeStatements = () => {
    setShowStockCheckList(true);
  };

  const editStatements = () => {
    setShowStockCheckList(false);
  };

  const handleInputStatement = (e) => setInputStatement(e.target.value);

  const handleInputWeight = (e) => {
    if (e.target.validity.valid) setInputWeight(e.target.value);
  };

  const handleStatementCheck = (e, index) => {
    console.log("index: ", index);
    setStatements((prevState) => [
      ...prevState.map((state, i) =>
        i === index ? { ...state, checked: !state.checked } : state
      ),
    ]);
  };

  const uncheckStatements = () => {
    setStatements((prevState) =>
      prevState.map((state) => ({ ...state, checked: false }))
    );
  };

  return (
    <section className="strategy-form">
      {showStockCheckList ? (
        <>
        <StockCheckList
          statements={statements}
          handleStatementCheck={handleStatementCheck}
          uncheckStatements={uncheckStatements}
        ></StockCheckList>
        <button onClick={editStatements}>edit checklist</button>
        <button onClick={editStatements}>save answers</button>
        </>
      ) : (
        <section>
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
            className="strategy-form__input strategy-form__input_statement"
          ></input>
          <input
            type="text"
            onChange={handleInputWeight}
            value={inputWeight}
            pattern="[0-9]*"
            placeholder="Defina o peso"
            className="strategy-form__input"
          ></input>
          <button
            onClick={() => addStatement()}
            className="strategy-form__button"
          >
            Adicionar
          </button>
          {statements.length > 0 && (
            <button onClick={storeStatements} className="strategy-form__button">
              Salvar
            </button>
          )}
          <ul>
            {statements.map((statement, index) => (
              <div>
                <li>
                  {`Afirmação: ${statement.statement}. 
                      Peso: ${statement.weight}.`}
                  <span onClick={(e) => removeStatement(e, statement, index)}>
                    {" "}
                    -{" "}
                  </span>
                </li>
              </div>
            ))}
          </ul>
        </section>
      )}
      <style>{`
      .strategy-form__list{
        list-style: none;
        padding: 0;
      }
      .strategy-form__button{
        padding: 5px;
        margin-right: 5px;
      }
      .strategy-form__input{
        padding: 5px;
        margin-right: 5px;
      }
      .strategy-form__input_statement{
        width: 300px;
      }
      `}</style>
    </section>
  );
}

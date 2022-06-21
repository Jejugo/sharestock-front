import React from "react";

export default function StrategyDefinition({
  handleInputStatement,
  inputStatement,
  handleInputWeight,
  inputWeight,
  statements,
  addStatement,
  storeStatements
}) {
  return (
    <section>
      <h1 className="strategy-form__title"> Defina sua estratégia </h1>
      <p className="strategy-form__subtitle">
        <i>
          Crie afirmações defensivas e estipule um peso para cada uma delas:
        </i>
      </p>
      <form className="strategy-form__form">
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
          onClick={(e) => addStatement(e)}
          className="strategy-form__button"
        >
          Adicionar
        </button>
        <button
          onClick={(e) => storeStatements(e)}
          className="strategy-form__button"
        >
          Salvar
        </button>
      </form>
      <ul className="strategy-form__list">
        {statements.map((statement, index) => (
          <div>
            <li className="strategy-form__list_item">
              <p>{`${statement.statement}`}</p>
              <span
                className="strategy-form__list_item--remove"
                onClick={(e) => removeStatement(e, statement, index)}
              >
                {" "}
                X{" "}
              </span>
            </li>
          </div>
        ))}
      </ul>
      <style>{`
        .strategy-form__back{
            position: absolute;
            left: 10px;
            top: 10%;
          }
          .strategy-form__buttons{
            display: flex;
            justify-content: space-around;
            width: 60%;
            margin: 0 auto;
          }
          .strategy-form__buttons_btn{
            padding: 5px 20px;
            border: none;
            font-size: 16px;
            border-radius: 5px;
          }
          .strategy-form__list{
            list-style: none;
            padding: 0;
          }
          .strategy-form__list_item{
            margin: 5px 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .strategy-form__list_item--remove{
            cursor: pointer;
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

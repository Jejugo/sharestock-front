import React, { useState, useEffect } from "react";
import StockCheckList from "./StockCheckList";
import SuggestedPercentages from "./SuggestedPercentages";
import { useAuth } from "../context/AuthUserContext";
import Firestore from '../firebase/Firestore';
import {
  getFirestore,
  updateDoc,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";

export default function StrategyForm({ setShowStrategies }) {
  const db = getFirestore();
  const { authUser } = useAuth();
  const [statements, setStatements] = useState([]);
  const [inputStatement, setInputStatement] = useState("");
  const [inputWeight, setInputWeight] = useState("");
  const [showStockCheckList, setShowStockCheckList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [walletResistancePoints, setWalletResistancePoints] = useState({});
  const [showSuggestedPercentages, setShowSuggestedPercentages] = useState(false)

  // ASSET STATEMENTS
  const [assetValue, setAssetValue] = useState("");

  const addStatement = (e) => {
    e.preventDefault()
    if(!inputWeight) {
      alert('Coloque um peso!')
      return
    }
    setStatements((prevState) => [
      ...prevState,
      {
        statement: inputStatement,
        weight: inputWeight,
        checked: false,
      },
    ]);
    setInputWeight('')
  };

  const removeStatement = async (e, { statement }, index) => {
    setStatements((prevState) => [
      ...prevState.filter((item, i) => index !== i),
    ]);
  };

  const storeStatements = async (e) => {
    try {
      e.preventDefault()
      await Firestore().addListAsObjects({
        collection: "userStrategyStatements",
        id: authUser.uid,
        list: statements
      })

      setShowStockCheckList(true);
    }
    catch (err) {
      console.error(err)
    }
  };

  const storeAssetStatementsAndClean = async () => {
    await storeAssetStatements();
    setStatements((previousState) => previousState.map(item => ({
      ...item,
      checked: false
    })));
    setAssetValue('');
  }

  const storeAssetAndCalculate = async () => {
    await storeAssetStatements();
    setLoading(true)
    const data = await Firestore().getAllItems({ collection: 'userAssetStatements', id: authUser.uid})
    const result = Object.keys(data).reduce((acc, assetKey) => ({
      ...acc,
      [assetKey]: data[assetKey].reduce((acc, statement) => {
        if(statement.checked) return acc + (1 * statement.weight)
        if(!statement.checked) return acc + (-1 * statement.weight)
      }, 0)
    }), {})
    setWalletResistancePoints(result)
    setShowStockCheckList(false)
    setShowSuggestedPercentages(true)
  }

  const storeAssetStatements = async () => {
    try {
      await Firestore().addListAsObjectsWithList({
        collection: "userAssetStatements",
        id: authUser.uid,
        list: statements,
        key: assetValue
      })
    }
    catch (err) {
      console.error(err)
    }
  }

  const editStatements = () => {
    setShowStockCheckList(false);
  };

  const handleInputStatement = (e) => setInputStatement(e.target.value);

  const handleInputWeight = (e) => {
    if (e.target.validity.valid) setInputWeight(e.target.value);
  };

  const handleStatementCheck = (e, index) => {
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

  useEffect(async () => {
    const statementsRef = doc(
      db,
      "userStrategyStatements",
      authUser.uid
    );
    const statementsSnap = await getDoc(statementsRef);
    if (statementsSnap.exists()) {
      const strategyStatements = statementsSnap.data();
      
      const cachedStrategyStatementsList = Object.keys(strategyStatements).map((companyName, index) => ({
        statement: strategyStatements[companyName].statement,
        weight: strategyStatements[companyName].weight,
        checked: false
      }))

      setStatements(cachedStrategyStatementsList)
    }

  }, [])

  return (
    <section className="strategy-form">
      {showStockCheckList ? (
        <>
        <p className="strategy-form__back" onClick={() => setShowStrategies(false)}> Definir as parcelas </p>
        <StockCheckList
          statements={statements}
          handleStatementCheck={handleStatementCheck}
          uncheckStatements={uncheckStatements}
          setAssetValue={setAssetValue}
          assetValue={assetValue}
        ></StockCheckList>
        <div className="strategy-form__buttons">
          <button className="strategy-form__buttons_btn" onClick={editStatements}>back</button>
          <button className="strategy-form__buttons_btn" onClick={storeAssetStatementsAndClean} disabled={!assetValue}>Adicionar</button>
          <button className="strategy-form__buttons_btn" onClick={storeAssetAndCalculate} disabled={!assetValue}>Calcular</button>
        </div>
        </>
      ) : showSuggestedPercentages ? (
        <SuggestedPercentages walletResistancePoints={walletResistancePoints} setShowSuggestedPercentages={setShowSuggestedPercentages}></SuggestedPercentages>
      ) : (
        <section>
          <p className="strategy-form__back" onClick={() => setShowStrategies(false)}> Volte para o início </p>
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
            <button onClick={(e) => storeStatements(e)} className="strategy-form__button">
              Salvar
            </button>
          </form>
          <ul className="strategy-form__list">
            {statements.map((statement, index) => (
              <div>
                <li className="strategy-form__list_item">
                  <p>{`${statement.statement}`}</p>
                  <span className="strategy-form__list_item--remove"onClick={(e) => removeStatement(e, statement, index)}>
                    {" "}
                    X{" "}
                  </span>
                </li>
              </div>
            ))}
          </ul>
        </section>
      )}
      <style>{`
      .strategy-form{
        margin: auto 23.5%;
      }
      .strategy-form__title, .strategy-form__subtitle, .strategy-form__form{
        text-align: center;
      }
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

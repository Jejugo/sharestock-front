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
import StrategyDefinition from "./StrategyDefinition";

export default function StrategyForm({ setShowStrategies }) {
  const db = getFirestore();
  const { authUser } = useAuth();
  const [inputStatement, setInputStatement] = useState("");
  const [inputWeight, setInputWeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [walletResistancePoints, setWalletResistancePoints] = useState({});
  const [showSuggestedPercentages, setShowSuggestedPercentages] = useState(false)
  const [showStockCheckList, setShowStockCheckList] = useState(false);

  // ASSET STATEMENTS
  const [assetValue, setAssetValue] = useState("");
  const [statements, setStatements] = useState([]);

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
        <p className="strategy-form__back" onClick={() => setShowStockCheckList(false)}> Definir as parcelas </p>
        <StockCheckList
          statements={statements}
          setStatements={setStatements}
          handleStatementCheck={handleStatementCheck}
          uncheckStatements={uncheckStatements}
          setAssetValue={setAssetValue}
          assetValue={assetValue}
          editStatements={editStatements}
          storeAssetStatementsAndClean={storeAssetStatementsAndClean}
          storeAssetAndCalculate={storeAssetAndCalculate}
        ></StockCheckList>
        </>
      ) : showSuggestedPercentages ? (
        <SuggestedPercentages walletResistancePoints={walletResistancePoints} setShowSuggestedPercentages={setShowSuggestedPercentages}></SuggestedPercentages>
      ) : (
        <>
        <p className="strategy-form__back" onClick={() => setShowStrategies(false)}> Volte para o início </p>
        <StrategyDefinition 
          handleInputStatement={handleInputStatement} 
          inputStatement={inputStatement} 
          handleInputWeight={handleInputWeight} 
          inputWeight={inputWeight} 
          statements={statements}
          addStatement={addStatement}
          storeStatements={storeStatements}
        ></StrategyDefinition>
        </>
      )}
      <style>{`
      .strategy-form{
        margin: auto 23.5%;
      }
      .strategy-form__title, .strategy-form__subtitle, .strategy-form__form{
        text-align: center;
      }
      `}</style>
    </section>
  );
}

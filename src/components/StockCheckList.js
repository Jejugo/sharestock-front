import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import { useAuth } from "../context/AuthUserContext";
import Firestore from '../firebase/Firestore';
import axios from 'axios';

export default function StockCheckList({
  statements,
  setStatements,
  handleStatementCheck,
  uncheckStatements,
  setAssetValue,
  assetValue,
  editStatements,
  storeAssetStatementsAndClean,
  storeAssetAndCalculate,
  shares
}) {
  const { authUser } = useAuth();
  const [assets, setAssets] = useState([]);

  const changeCompany = async (e) => {
    setAssetValue(e.target.value);
    uncheckStatements();
  };

  useEffect(async () => {
    if(assetValue){
      const data = await Firestore().getAllItems({ collection: 'userAssetStatements', id: authUser.uid})
      if(data.hasOwnProperty(assetValue)) setStatements(data[assetValue])
      else return
    }
  }, [assetValue])

  useEffect(async () => {
    setAssets(shares)
  }, [])

  return (
    <section className="stock-checklist">
      <h1 className="stock-checklist__title">Escolha o ativo:</h1>
      <div className="stock-checklist__dropdown_wrapper">
        <select className="stock-checklist__dropdown" value={assetValue} onChange={changeCompany}>
          <option value="" selected disabled>
            Selecione
          </option>
          {
            assets.map(asset => (
              <option value={asset["código_de_neg."].toLowerCase()}>{asset["código_de_neg."]}</option>
            ))
          }
        </select>
      </div>
      <ul className="stock-checklist__list">
        {statements.length > 0 &&
          statements.map(({ statement, checked }, index) => (
            <li className="stock-checklist__list_item">
              <div className="stock-checklist__list_item--wrapper">
              <p>{statement}</p>
              <Switch onChange={(e) => handleStatementCheck(e, index)} checked={checked} disabled={!assetValue}/>
              </div>
            </li>
          ))}
      </ul>
      <div className="strategy-form__buttons">
          <button className="strategy-form__buttons_btn" onClick={editStatements}>back</button>
          <button className="strategy-form__buttons_btn" onClick={storeAssetStatementsAndClean} disabled={!assetValue}>Adicionar</button>
          <button className="strategy-form__buttons_btn" onClick={storeAssetAndCalculate} disabled={!assetValue}>Calcular</button>
        </div>
      <style>{`
        .stock-checklist__title, 
        .stock-checklist__dropdown{
          text-align: center;
        }

        .stock-checklist__title{
          font-size: 24px;
        }

        .stock-checklist__dropdown_wrapper{
          text-align: center;
        }


        .stock-checklist__dropdown{
          font-size: 18px;
          padding: 5px 15px;
        }

        .stock-checklist__list{
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .stock-checklist__list_item{
          margin: 20px 0;
          background-color: grey;
          padding: 2px 10px;
          border-radius: 5px;
        }

        .stock-checklist__list_item--wrapper{
          display: flex;
          align-items: center;
          justify-content: space-between;
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

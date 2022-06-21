import React, { useState, useEffect } from "react";
import Switch from "react-switch";

export default function StockCheckList({
  statements,
  handleStatementCheck,
  uncheckStatements,
  setAssetValue,
  assetValue,
}) {
  const [assets, setAssets] = useState([]);

  const changeCompany = (e) => {
    if (assetValue) {
      //CHANGE THIS LINE -- NOT UPDATING PROPERLY, ADDING NEW NAME AND NOT REPLACING EXISTING ONE
      setAssets((prevState) => [
        ...prevState,
        { name: assetValue, statements },
      ]);
      uncheckStatements();
    }
    setAssetValue(e.target.value);
  };
  return (
    <section className="stock-checklist">
      <h1 className="stock-checklist__title">Escolha o ativo:</h1>
      <div className="stock-checklist__dropdown_wrapper">
        <select className="stock-checklist__dropdown" value={assetValue} onChange={changeCompany}>
          <option value="" selected disabled>
            Selecione
          </option>
          <option value="abev3">ABEV3</option>
          <option value="mglu3">MGLU3</option>
          <option value="petr4">PETR4</option>
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

      `}</style>
    </section>
  );
}

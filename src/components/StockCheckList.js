import React, { useState, useEffect } from "react";

export default function StockCheckList({ statements, handleStatementCheck, uncheckStatements }) {
  const [assetValue, setAssetValue] = useState("");
  const [assets, setAssets] = useState([]);

  const changeCompany = (e) => {
    if(assetValue){
        //CHANGE THIS LINE -- NOT UPDATING PROPERLY, ADDING NEW NAME AND NOT REPLACING EXISTING ONE
        setAssets((prevState) => [...prevState, { name: assetValue, statements}])
        uncheckStatements()
    }
    setAssetValue(e.target.value)
  }
  return (
    <section>
      <h1>Escolha o ativo:</h1>
      <select
        value={assetValue}
        onChange={changeCompany}
      >
        <option value="" selected disabled>Selecione</option>
        <option value="abev3">ABEV3</option>
        <option value="mglu3">MGLU3</option>
        <option value="petr4">PETR4</option>
      </select>
      <ul>
        {statements.length > 0 && statements.map(({ statement, checked }, index) => (
          <li>
            {statement}
            <input
              onChange={(e) => handleStatementCheck(e, index)}
              type="checkbox"
              checked={checked}
            ></input>
          </li>
        ))}
      </ul>
    </section>
  );
}

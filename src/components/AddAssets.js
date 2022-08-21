import React from "react";
import StockCheckList from "./StockCheckList";
import Select from "react-select";

export default function AddAssets({
  setShowAddAsset,
  assetValue,
  assets,
  changeCompany,
  setQuantity,
  quantity,
  statements,
  setStatements,
  handleStatementCheck,
  uncheckStatements,
  setAssetValue,
  storeAssetStatements,
  inputItems
}) {
  return (
    <section className="add-assets">
      <div style={{color: 'black'}}>
      <Select
        type="text"
        options={inputItems}
        placeholder="Ativo"
        onChange={changeCompany}
        value={assetValue.value}
      ></Select>
      </div>
      <input
        className="add-assets__input"
        placeholder="Quantidade"
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
      ></input>
      <StockCheckList
        statements={statements}
        setStatements={setStatements}
        handleStatementCheck={handleStatementCheck}
        uncheckStatements={uncheckStatements}
        setAssetValue={setAssetValue}
        assetValue={assetValue}
        storeAssetStatements={storeAssetStatements}
        setShowAddAsset={setShowAddAsset}
      ></StockCheckList>
      <style>{`
        .add-assets__dropdown{
            padding: 10px;
            display: block;
            margin-bottom: 10px;
        }
        .add-assets__input{
            display: block;
            padding: 10px;
            margin: 20px 0px;
            border: none;
            border-radius: 2px;
        }
      `}</style>
    </section>
  );
}

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthUserContext";
import Firestore from "../firebase/Firestore";
import StockCheckList from "./StockCheckList";

export default function AddAssets({ shares, setShowAddAsset, sharesMap }) {
  const { authUser } = useAuth();
  const [assets, setAssets] = useState([]);
  const [assetValue, setAssetValue] = useState("");
  const [statements, setStatements] = useState([]);
  const [ quantity, setQuantity ] = useState("");

  const changeCompany = async (e) => {
    setAssetValue(e.target.value);
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

  const storeAssetStatements = async () => {
    try {
      await Promise.all([
        await Firestore().addListAsObjectsWithList({
          collection: "userAssetStatements",
          id: authUser.uid,
          list: statements,
          key: assetValue,
        }),
        await Firestore().addListAsObjects({
          collection: "userAssets",
          id: authUser.uid,
          list: [{
            ...sharesMap[assetValue],
            quantity: parseInt(quantity)
          }],
          key: assetValue,
        }),
      ]);

      uncheckStatements();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(async () => {
    if(authUser){
      setAssets(shares);
      const data = await Firestore().getAllItems({
        collection: "userStrategyStatements",
        id: authUser.uid,
      });
      const formattedData = Object.keys(data).map((key) => ({
        ...data[key],
      }));
      setStatements(formattedData);
    }
  }, [authUser]);

  return (
    <section className="add-assets">
      <select
        className="add-assets__dropdown"
        value={assetValue}
        onChange={changeCompany}
      >
        <option value="" selected disabled>
          Selecione
        </option>
        {assets.map((asset) => (
          <option value={asset["código_de_neg."].toLowerCase()}>
            {asset["código_de_neg."]}
          </option>
        ))}
      </select>
      <input className="add-assets__input" placeholder="Quantidade" onChange={(e) => setQuantity(e.target.value)} value={quantity}></input>
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
            margin-bottom: 10px;
        }
      `}</style>
    </section>
  );
}

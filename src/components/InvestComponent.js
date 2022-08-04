import React, { useState, useEffect } from "react";
import Select from "react-select";
import StockCheckList from "./StockCheckList";
import Firestore from "../firebase/Firestore";
import { useAuth } from "../context/AuthUserContext";

export default function InvestComponent({ shares, normalizedShares }) {
  const { authUser } = useAuth();
  const [selectedAsset, setSelectedAsset] = useState("");
  const [statements, setStatements] = useState([]);

  const handleFilterInput = (value) => {
    setSelectedAsset(value);
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
      await Firestore().addListAsObjectsWithList({
        collection: "userAssetStatements",
        id: authUser.uid,
        list: statements,
        key: assetValue,
      });

      uncheckStatements();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(async () => {
    const data = await Firestore().getAllItems({
      collection: "userStrategyStatements",
      id: authUser.uid,
    });
    const formattedData = Object.keys(data).map((key) => ({
      ...data[key],
    }));
    setStatements(formattedData);
  }, []);

  return (
    <section className="invest_component">
      <div className="invest_component__search_bar">
        {
            
        }
        <Select
          type="text"
          options={normalizedShares}
          placeholder="Ativo"
          onChange={handleFilterInput}
          value={selectedAsset}
        ></Select>
        <StockCheckList
          statements={statements}
          setStatements={setStatements}
          handleStatementCheck={handleStatementCheck}
          uncheckStatements={uncheckStatements}
          setAssetValue={setSelectedAsset}
          assetValue={selectedAsset.value}
          storeAssetStatements={storeAssetStatements}
        ></StockCheckList>
      </div>
      <style jsx>{`
        .invest_component__search_bar {
          display: block;
          padding: 10px 5px;
          width: 80%;
          margin: 0 auto;
          font-size: 16px;
          color: black;
        }
      `}</style>
    </section>
  );
}

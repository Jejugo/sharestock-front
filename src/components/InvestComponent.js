import React, { useState, useEffect } from "react";
import Select from "react-select";
import StockCheckList from "./StockCheckList";
import Firestore from "../firebase/Firestore";
import AssetsToInvestSideTable from "./AssetsToInvestSideTable";
import { useAuth } from "../context/AuthUserContext";

export default function InvestComponent({ shares, normalizedShares }) {
  const { authUser } = useAuth();
  const [selectedAsset, setSelectedAsset] = useState("");
  const [statements, setStatements] = useState([]);
  const [showSuggestedPercentages, setShowSuggestedPercentages] =
    useState(false);
  const [walletResistancePoints, setWalletResistancePoints] = useState({});
  const [loading, setLoading] = useState(false);
  const [assetsToInvest, setAssetsToInvest] = useState([]);

  const removeAssets = (key) => {
    setAssetsToInvest((previousState) => {
      delete previousState[key]
      return {
        ...previousState
      }
    })
  }

  const storeAsset = async () => {
    await storeAssetStatements();
  };

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
      await setAssetsToInvest((previousState) => {
        return { ...previousState, [selectedAsset.value]: statements };
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

  useEffect(() => {
    setLoading(true);
    const data = assetsToInvest;
    const result = Object.keys(data).reduce(
      (acc, assetKey) => ({
        ...acc,
        [assetKey]: data[assetKey].reduce((acc, statement) => {
          if (statement.checked) return acc + 1 * statement.weight;
          if (!statement.checked) return acc + -1 * statement.weight;
        }, 0),
      }),
      {}
    );

    setWalletResistancePoints(result);
    setLoading(false);
  }, [assetsToInvest])

  return (
    <section className="invest_component">
      <div className="invest_component__search_bar">
        <div className="invest_component__view">
          <section className="invest_component__view_add_asset">
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
              storeAsset={storeAsset}
            ></StockCheckList>
          </section>
          <section className="invest_component__view_overview">
            <AssetsToInvestSideTable
              walletResistancePoints={walletResistancePoints}
              setShowSuggestedPercentages={setShowSuggestedPercentages}
              removeAssets={removeAssets}
            ></AssetsToInvestSideTable>
          </section>
        </div>
      </div>
      <style jsx>{`
        .invest_component__search_bar {
          display: block;
          padding: 10px 5px;
          font-size: 16px;
          color: black;
        }
        .invest_component__view {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        .invest_component__view_add_asset {
          flex-basis: 60%;
        }
        .invest_component__view_overview {
          flex-basis: 38%;
          min-width: 370px;
        }
      `}</style>
    </section>
  );
}

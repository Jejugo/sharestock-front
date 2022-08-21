import React, { useState, useEffect } from "react";
import Template from "../skeleton/Template";
import config from "../configs";
import AddAssets from "../components/AddAssets";
import Firestore from "../firebase/Firestore";

import { useAuth } from "../context/AuthUserContext";
import AssetsTableContainer from "../components/AssetsTableContainer";
const { SHARE_API } = config;

const MyAssets = (props) => {
  const { authUser } = useAuth();
  const [showAddAsset, setShowAddAsset] = useState(false);
  const [assets, setAssets] = useState([]);
  const [assetValue, setAssetValue] = useState("");
  const [statements, setStatements] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [inputItems, setInputItems] = useState([])

  const handleAddAsset = () => {
    setShowAddAsset((previousState) => !previousState);
  };

  const changeCompany = async ({ value }) => {
    setAssetValue(value);
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
      console.log(props.sharesMap)
      console.log(props.sharesMap[assetValue])
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
          list: [
            {
              ...props.sharesMap[assetValue],
              quantity: parseInt(quantity),
            },
          ],
          key: assetValue,
        }),
      ]);

      uncheckStatements();
      setAssetValue("")
      setQuantity("")
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(async () => {
    if (authUser) {
      setAssets(props.shares);
      setInputItems(props.normalizedShares)
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
    <>
      <Template tabTitle={"My Assets"}>
        <div className="my-assets">
          <h1 className="my-assets__title">Meus Ativos</h1>
          <div>
            {
              showAddAsset && (
                <button className="my-assets__button" onClick={handleAddAsset}>
                  Voltar
                </button>
              )
            }
            <button
              className="my-assets__button"
              onClick={!showAddAsset ? handleAddAsset : storeAssetStatements}
            >
              {!showAddAsset ? `Adicionar Ativo` : `Salvar`}
            </button>
          </div>
        </div>
        {!showAddAsset && authUser ? (
          <AssetsTableContainer
            shares={props.shares}
            sharesMap={props.sharesMap}
          ></AssetsTableContainer>
        ) : (
          <AddAssets
            setShowAddAsset={setShowAddAsset}
            assetValue={assetValue}
            setAssetValue={setAssetValue}
            assets={assets}
            changeCompany={changeCompany}
            setQuantity={setQuantity}
            quantity={quantity}
            statements={statements}
            setStatements={setStatements}
            handleStatementCheck={handleStatementCheck}
            uncheckStatements={uncheckStatements}
            storeAssetStatements={storeAssetStatements}
            inputItems={inputItems}
          ></AddAssets>
        )}
        <style>{`
          .my-assets{
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
          }

          .my-assets__button{
            padding: 20px 30px;
            background-color: #FFCD00;
            cursor: pointer;
            border: none;
            border-radius: 5px;
            margin-left: 20px;
          }
        `}</style>
      </Template>
    </>
  );
};

export async function getServerSideProps() {
  let data = await fetch(`${SHARE_API}/shares/all`);
  const { items: sharesItems } = await data.json();

  const sharesMap = sharesItems.reduce((acc, curr) => ({
    ...acc,
    [curr["Papel"].toLowerCase()]: curr,
  }), {});

  const normalizeShareItems = sharesItems.map(item => ({
    value: item["Papel"].toLowerCase(), 
    label: `${item["nome"]} - ${item["Papel"]}` 
  }))

  return {
    props: {
      shares: sharesItems,
      sharesMap,
      normalizedShares: normalizeShareItems
    },
  };
}

export default MyAssets;

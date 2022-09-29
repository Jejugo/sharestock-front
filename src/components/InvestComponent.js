import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import StockCheckList from './StockChekList/StockCheckList';
import Firestore from '../firebase/Firestore';
import AssetsToInvestSideTable from './AssetsToInvestSideTable';
import { useAuth } from '../context/AuthUserContext';

export default function InvestComponent({ sharesMap, normalizedShares }) {
  const { authUser } = useAuth();
  const [selectedAsset, setSelectedAsset] = useState('');
  const [statements, setStatements] = useState([]);
  const [, setShowSuggestedPercentages] = useState(false);
  const [walletResistancePoints, setWalletResistancePoints] = useState({});
  const [, setLoading] = useState(false);
  const [assetsToInvest, setAssetsToInvest] = useState([]);
  const [userAssets, setUserAssets] = useState({});
  const [quantity, setQuantity] = useState([]);

  const removeAssets = key => {
    setAssetsToInvest(previousState => {
      delete previousState[key];
      return {
        ...previousState,
      };
    });
  };

  const saveAssetStatementsToState = async () => {
    try {
      await setAssetsToInvest(previousState => {
        return { ...previousState, [selectedAsset.value]: statements };
      });

      uncheckStatements();
    } catch (err) {
      console.error(err);
    }
  };

  const storeAssetStatements = async () => {
    try {
      for (let asset in assetsToInvest) {
        if (userAssets.hasOwnProperty(asset)) {
          await Promise.all([
            await Firestore().addListAsObjectsWithList({
              collection: 'userAssetStatements',
              id: authUser.uid,
              list: assetsToInvest[asset],
              key: asset,
            }),
            await Firestore().addListAsObjects({
              collection: 'userAssets',
              id: authUser.uid,
              list: [
                {
                  ...(userAssets[asset] && userAssets[asset]),
                  quantity:
                    parseInt(userAssets[asset].quantity) +
                    parseInt(quantity[asset]),
                },
              ],
              key: asset,
            }),
          ]);
        } else {
          await Promise.all([
            await Firestore().addListAsObjectsWithList({
              collection: 'userAssetStatements',
              id: authUser.uid,
              list: assetsToInvest[asset],
              key: asset,
            }),
            await Firestore().addListAsObjects({
              collection: 'userAssets',
              id: authUser.uid,
              list: [
                {
                  ...sharesMap[asset],
                  quantity: parseInt(quantity[asset]),
                },
              ],
              key: asset,
            }),
          ]);
        }

        alert('Dados salvos com sucesso.');
        uncheckStatements();
        setQuantity('');
        setSelectedAsset('');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleFilterInput = value => {
    setSelectedAsset(value);
  };

  const handleStatementCheck = (e, index) => {
    setStatements(prevState => [
      ...prevState.map((state, i) =>
        i === index ? { ...state, checked: !state.checked } : state,
      ),
    ]);
  };

  const uncheckStatements = () => {
    setStatements(prevState =>
      prevState.map(state => ({ ...state, checked: false })),
    );
  };

  useEffect(() => {
    setQuantity(() =>
      normalizedShares.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.value]: '',
        }),
        {},
      ),
    );
  }, [normalizedShares]);

  useEffect(async () => {
    const data = await Firestore().getAllItems({
      collection: 'userStrategyStatements',
      id: authUser.uid,
    });
    const allUserAssets = await Firestore().getAllItems({
      collection: 'userAssets',
      id: authUser.uid,
    });
    const formattedData = Object.keys(data).map(key => ({
      ...data[key],
    }));
    setStatements(formattedData);
    setUserAssets(allUserAssets);
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
      {},
    );
    setWalletResistancePoints(result);
    setLoading(false);
  }, [assetsToInvest]);

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
            <input
              className="invest_component__input"
              placeholder="Quantidade"
              onChange={e =>
                setQuantity(previousState => ({
                  ...previousState,
                  [selectedAsset.value]: e.target.value,
                }))
              }
              value={quantity[selectedAsset.value]}
            ></input>
            <StockCheckList
              statements={statements}
              setStatements={setStatements}
              handleStatementCheck={handleStatementCheck}
              uncheckStatements={uncheckStatements}
              setAssetValue={setSelectedAsset}
              assetValue={selectedAsset.value}
              assetsToInvest={assetsToInvest}
            ></StockCheckList>
            <button
              className="invest_component__button"
              onClick={saveAssetStatementsToState}
            >
              Calcular
            </button>
            <button
              className="invest_component__button"
              onClick={storeAssetStatements}
            >
              Salvar
            </button>
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
        .invest_component__input {
          display: block;
          padding: 10px;
          width: 96%;
          margin: 10px 0px;
          border: none;
          border-radius: 2px;
        }
        .invest_component__button {
          width: 100%;
          padding: 20px 0px;
          background-color: #ffcd00;
          cursor: pointer;
          border: none;
          border-radius: 5px;
        }
        .invest_component__button:nth-of-type(2) {
          margin: 20px 0px;
        }
      `}</style>
    </section>
  );
}

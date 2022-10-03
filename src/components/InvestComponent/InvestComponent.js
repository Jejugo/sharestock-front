import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import StockCheckList from '../StockChekList/StockCheckList';
import Firestore from '../../firebase/Firestore';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import SuggestedPercentages from '../SuggestedPercentages/SuggestedPercentages';
import WishList from '../WishList/WishList';
import { useAuth } from '../../context/AuthUserContext';

import * as S from './styles';

export default function InvestComponent({ sharesMap, normalizedShares }) {
  const { authUser } = useAuth();
  const [selectedAsset, setSelectedAsset] = useState('');
  const [statements, setStatements] = useState([]);
  const [walletResistancePoints, setWalletResistancePoints] = useState({});
  const [loading, setLoading] = useState(false);
  const [assetsToInvest, setAssetsToInvest] = useState({});
  const [userAssets, setUserAssets] = useState({});
  const [quantity, setQuantity] = useState([]);

  // Suggestions State
  const [showSuggestions, setShowSuggestions] = useState(true);
  const titleRef = useRef(null);

  // Snackbar state
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Wishlist
  const [wishListVisible, setWishListVisible] = useState(false);

  const chosenAssets = Object.keys(assetsToInvest);

  const removeAssets = (e, key) => {
    setAssetsToInvest(previousState => {
      delete previousState[key];
      return {
        ...previousState,
      };
    });
  };

  const handleCalculate = () => {
    setShowSuggestions(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      titleRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  };

  const snackbarClose = () => setShowSnackbar(false);

  const saveAssetStatementsToState = async () => {
    try {
      await setAssetsToInvest(previousState => {
        return { ...previousState, [selectedAsset.value]: statements };
      });

      setSnackbarMessage(`Added ${selectedAsset.value} to the calculation...`);
      setShowSnackbar(true);

      uncheckStatements();
      setSelectedAsset('');
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
                    userAssets[asset] && userAssets[asset].quantity
                      ? parseInt(userAssets[asset].quantity) +
                        parseInt(quantity[asset])
                      : parseInt(quantity[asset]),
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
    const result = Object.keys(assetsToInvest).reduce(
      (acc, assetKey) => ({
        ...acc,
        [assetKey]: assetsToInvest[assetKey].reduce((acc, statement) => {
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
    <S.InvestComponent>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            top: '40vh',
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <S.InvestComponentLayout>
          <S.StockListAdd className="invest_component__view_add_asset">
            <S.InputWrapper>
              <S.DropdownStyle>
                <Select
                  type="text"
                  options={normalizedShares}
                  placeholder="Ativo"
                  onChange={handleFilterInput}
                  value={selectedAsset}
                ></Select>
              </S.DropdownStyle>
              <S.StockListQuantityInput
                className="invest_component__input"
                placeholder="Quantidade"
                onChange={e =>
                  setQuantity(previousState => ({
                    ...previousState,
                    [selectedAsset.value]: e.target.value,
                  }))
                }
                value={quantity[selectedAsset.value] || ''}
              ></S.StockListQuantityInput>
            </S.InputWrapper>
            <S.ScoreView>
              <S.Points color="green">
                <S.PointsText>Pontos positivos: </S.PointsText>
              </S.Points>
              <S.Points color="red">
                <S.PointsText>Pontos negativos: </S.PointsText>
              </S.Points>
              <S.Points color="orange">
                <S.PointsText>Pontos totais: </S.PointsText>
              </S.Points>
            </S.ScoreView>
            <StockCheckList
              statements={statements}
              setStatements={setStatements}
              handleStatementCheck={handleStatementCheck}
              uncheckStatements={uncheckStatements}
              setAssetValue={setSelectedAsset}
              assetValue={selectedAsset.value}
              assetsToInvest={assetsToInvest}
            ></StockCheckList>
            <S.StockCheckBtnWrapper>
              <S.StockCheckAddBtn
                className="invest_component__button"
                onClick={saveAssetStatementsToState}
                disabled={!selectedAsset}
              >
                Adicionar mais ativos
              </S.StockCheckAddBtn>
              <S.StockCheckAddBtn
                className="invest_component__button"
                onClick={() => handleCalculate()}
                disabled={!selectedAsset}
              >
                Calcular
              </S.StockCheckAddBtn>
              <S.StockCheckAddBtn
                className="invest_component__button"
                onClick={storeAssetStatements}
                disabled={!Object.keys(assetsToInvest).length}
              >
                Salvar
              </S.StockCheckAddBtn>
            </S.StockCheckBtnWrapper>
          </S.StockListAdd>
          {showSuggestions && (
            <section className="invest_component__view_overview">
              <SuggestedPercentages
                walletResistancePoints={walletResistancePoints}
                removeAssets={removeAssets}
                titleRef={titleRef}
              ></SuggestedPercentages>
            </section>
          )}
          <Snackbar
            open={showSnackbar}
            autoHideDuration={3000}
            onClose={snackbarClose}
            message={snackbarMessage}
          />
          <WishList
            wishList={chosenAssets}
            visible={wishListVisible}
            setVisible={setWishListVisible}
            removeItem={removeAssets}
          ></WishList>
        </S.InvestComponentLayout>
      )}
    </S.InvestComponent>
  );
}

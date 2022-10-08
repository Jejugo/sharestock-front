import React, { useState, useEffect } from 'react';
import StockCheckList from '../StockChekList/StockCheckList';
import Select from 'react-select';
import { useAuth } from '../../context/AuthUserContext';
import Firestore from '../../firebase/Firestore';

import * as S from './styles.js';
import { convertObjectToArray } from '../../builders/arrays';

export default function AddAssets({
  setShowAddAsset,
  shareList,
  dropdownShares,
  sharesMap,
}) {
  const { authUser } = useAuth();
  const [, setAssets] = useState([]);
  const [assetValue, setAssetValue] = useState('');
  const [dropdownItems, setDropdownItems] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [statements, setStatements] = useState([]);

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

  const clearState = () => {
    uncheckStatements();
    setAssetValue('');
    setQuantity('');
  };

  const changeCompany = async ({ value }) => {
    setAssetValue(value);
  };

  const isEveryCheckFalse = statements =>
    statements.every(({ checked }) => !checked);

  const storeAssetStatements = async () => {
    try {
      if (!isEveryCheckFalse(statements)) {
        await Promise.all([
          await Firestore().addListAsObjectsWithList({
            collection: 'userAssetStatements',
            id: authUser.uid,
            list: statements,
            key: assetValue,
          }),
          await Firestore().addListAsObjects({
            collection: 'userAssets',
            id: authUser.uid,
            list: [
              {
                ...sharesMap[assetValue],
                quantity: parseInt(quantity),
              },
            ],
            key: assetValue,
          }),
        ]);

        clearState();
        alert('Dados salvos com sucesso.');
      } else {
        alert('Você precisa selecionar pelo menos um item.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(async () => {
    if (authUser) {
      setAssets(shareList);
      setDropdownItems(dropdownShares);
      const data = await Firestore().getAllItems({
        collection: 'userStrategyStatements',
        id: authUser.uid,
      });
      const formattedData = convertObjectToArray(data);
      setStatements(formattedData);
    }
  }, [authUser]);

  return (
    <section>
      <S.TopActions>
        <S.AddAssetBtn
          className="my-assets__button"
          onClick={storeAssetStatements}
        >
          Salvar
        </S.AddAssetBtn>
        <S.AddAssetBtn
          onClick={() => setShowAddAsset(previousState => !previousState)}
        >
          Voltar
        </S.AddAssetBtn>
      </S.TopActions>
      <div style={{ color: 'black' }}>
        <Select
          type="text"
          options={dropdownItems}
          placeholder="Ativo"
          onChange={changeCompany}
          value={assetValue.value}
        ></Select>
      </div>
      <S.AddCompanyInput
        placeholder="Quantidade"
        onChange={e => setQuantity(e.target.value)}
        value={quantity}
      ></S.AddCompanyInput>
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
    </section>
  );
}

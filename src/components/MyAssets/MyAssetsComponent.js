import React, { useState, useEffect } from 'react';

import AssetsTableContainer from '../AssetsTableContainer';
import AddAssets from '../AddAssets/AddAssets';

import * as S from './styles';

export default function MyAssetsComponent({ shareList, normalizedShares, sharesMap }) {
  const [showAddAsset, setShowAddAsset] = useState(false);

  return (
    <S.MyAssets>
      <S.MyAssetsHeader>
        <h1>Meus Ativos</h1>
        <div>
          {showAddAsset && (
            <S.AddAssetBtn
              onClick={() => setShowAddAsset(previousState => !previousState)}
            >
              Voltar
            </S.AddAssetBtn>
          )}
          <S.AddAssetBtn
            className="my-assets__button"
            onClick={() =>
              !showAddAsset
                ? setShowAddAsset(previousState => !previousState)
                : storeAssetStatements
            }
          >
            {!showAddAsset ? 'Adicionar Ativo' : 'Salvar'}
          </S.AddAssetBtn>
        </div>
      </S.MyAssetsHeader>
      {!showAddAsset ? (
        <AssetsTableContainer></AssetsTableContainer>
      ) : (
        <AddAssets
          setShowAddAsset={setShowAddAsset}
          shareList={shareList}
          normalizedShares={normalizedShares}
          sharesMap={sharesMap}
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
    </S.MyAssets>
  );
}

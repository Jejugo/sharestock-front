import React, { useState, useEffect } from 'react';

import AssetsTableContainer from '../AssetTableContainer/AssetsTableContainer';
import AddAssets from '../AddAssets/AddAssets';

import * as S from './styles';

export default function MyAssetsComponent({
  shareList,
  normalizedShares,
  sharesMap,
}) {
  const [showAddAsset, setShowAddAsset] = useState(false);

  return (
    <S.MyAssets>
      {!showAddAsset ? (
        <AssetsTableContainer
          setShowAddAsset={setShowAddAsset}
        ></AssetsTableContainer>
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

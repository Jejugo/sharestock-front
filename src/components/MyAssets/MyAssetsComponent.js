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
    </S.MyAssets>
  );
}

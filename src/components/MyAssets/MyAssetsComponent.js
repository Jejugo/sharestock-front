import React, { useState, useEffect } from 'react';

import AssetsTableContainer from '../AssetTableContainer/AssetsTableContainer';
import AddAssets from '../AddAssets/AddAssets';

import * as S from './styles';

export default function MyAssetsComponent({
  shareList,
  dropdownShares,
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
          dropdownShares={dropdownShares}
          sharesMap={sharesMap}
        ></AddAssets>
      )}
    </S.MyAssets>
  );
}

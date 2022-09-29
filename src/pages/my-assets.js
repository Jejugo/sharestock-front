import React from 'react';
import Template from '../skeleton/Template/Template';
import config from '../configs';

import MyAssetsComponent from '../components/MyAssets/MyAssetsComponent';
import {
  convertArrayToObject,
  normalizeArrayToDropdown,
} from '../builders/arrays';
const { SHARE_API } = config;

const MyAssets = props => {
  return (
    <>
      <Template tabTitle={'My Assets'}>
        <MyAssetsComponent
          shareList={props.shareList}
          normalizedShares={props.normalizedShares}
					sharesMap={props.sharesMap}
        />
      </Template>
    </>
  );
};

export async function getServerSideProps() {
  let data = await fetch(`${SHARE_API}/shares/all`);
  const { items: shareList } = await data.json();

  const sharesMap = convertArrayToObject(shareList, 'Papel');
  const normalizeShareItems = normalizeArrayToDropdown(shareList);

  return {
    props: {
      shareList,
      sharesMap,
      normalizedShares: normalizeShareItems,
    },
  };
}

export default MyAssets;

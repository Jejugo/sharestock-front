import React, { useState, useEffect } from 'react';
import Template from '../skeleton/Template/Template';
import InvestComponent from '../components/InvestComponent/InvestComponent';
import { useAuth } from '../context/AuthUserContext';
import config from '../configs';
import {
  convertArrayToObject,
  normalizeArrayToDropdown,
} from '../builders/arrays';

const { SHARE_API } = config;

export default function Invest(props) {
  const [shares, setShares] = useState([]);
  const [sharesMap, setSharesMap] = useState([]);
  const [dropdownShares, setDropdownShares] = useState([]);

  useEffect(() => {
    const { sharesDropdown, shares, sharesMap } = props;
    setDropdownShares(sharesDropdown);
    setShares(shares);
    setSharesMap(sharesMap);
  });

  return (
    <section className="dashboard">
      <Template tabTitle={'dashboard'}>
        <InvestComponent
          shares={shares}
          dropdownShares={dropdownShares}
          sharesMap={sharesMap}
        ></InvestComponent>
      </Template>
    </section>
  );
}

export async function getServerSideProps() {
  let data = await fetch(`${SHARE_API}/shares/all`);
  const { items: shareList } = await data.json();
  const normalizeShareItems = normalizeArrayToDropdown(shareList);
  const sharesMap = convertArrayToObject(shareList, 'Papel');
  return {
    props: {
      sharesDropdown: normalizeShareItems,
      shareList,
      sharesMap,
    },
  };
}

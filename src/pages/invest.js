import React, { useState, useEffect } from 'react'
import Template from "../skeleton/Template";
import InvestComponent from '../components/InvestComponent';
import { useAuth } from "../context/AuthUserContext";
import config from "../configs";

const { SHARE_API } = config;   

export default function Invest(props) {
    const { authUser } = useAuth();
    const [shares, setShares] = useState([]);
    const [normalizedShares, setNormalizedShares] = useState([]);

  useEffect(() => {
    const { normalizedShares, shares } = props;
    setNormalizedShares(normalizedShares);
    setShares(shares)
  })

    return (
         <section className="dashboard">
        {authUser && (
            <Template tabTitle={"dashboard"}>
                <InvestComponent shares={shares} normalizedShares={normalizedShares}></InvestComponent>
            </Template>
        )}
        </section>
    )
}

export async function getServerSideProps() {
    let shares = await fetch(`${SHARE_API}/shares/all`);
    const sharesItems = await shares.json();

    const normalizeShareItems = sharesItems.map(item => ({value: item["código_de_neg."].toLowerCase(), label: `${item["nome"]} - ${item["código_de_neg."]}` }))
  
    return {
      props: {
        normalizedShares: normalizeShareItems,
        shares: sharesItems
      },
    };
  }

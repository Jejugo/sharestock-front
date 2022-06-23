import React, { useEffect, useState } from "react";
import fetch from "isomorphic-unfetch";
import Router from "next/router";
import List from "../components/List";
import SearchBar from "../components/SearchBar";
import TableLayout from "../skeleton/TableLayout";
import config from "../configs";
import Fonts from "../components/Fonts";
import Template from "../components/Template";
import { useAuth } from "../context/AuthUserContext";

const { SHARE_API } = config;

const GoodIndicators = (props) => {
  const [shares, setShares] = useState([]);
  const [search, setSearch] = useState("");
  const [fixTableHeader, setFixTableHeader] = useState(false);

  const { authUser } = useAuth();

  const redirectIfUserNotLoggedIn = async () => {
    const router = Router;
    await sleep(2000);
    if (!authUser) router.push("/login");
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(async () => {
    Fonts();
    const { shares } = props;
    setShares(shares);
    window.addEventListener("scroll", handleScroll);
    //await redirectIfUserNotLoggedIn();
  }, []);

  const handleSearchBar = (e) => {
    setSearch(e.target.value);
    setFixTableHeader(false);
  };

  const goToFundamentus = () => {
    const router = Router;
    router.push(
      `//fundamentus.com.br/detalhes.php?papel=${share.toUpperCase()}`
    );
  };

  const setNewShares = (shares) => {
    setShares(shares);
  };

  const isTableHeaderFixed = (position) => position.top < 0;

  const handleScroll = () => {
    const elem = document.getElementById("share-data");
    let position = elem.getBoundingClientRect();

    setFixTableHeader(isTableHeaderFixed(position));
  };

  return (
    <>
      {authUser && (
        <Template tabTitle={"good-indicators"}>
          <section className="home">
            <SearchBar
              handleSearchBar={handleSearchBar}
              value={search}
              placeholder={"Ativo"}
            ></SearchBar>
            <TableLayout>
              <List
                fixTableHeader={fixTableHeader}
                shares={shares}
                value={search}
                goToFundamentus={goToFundamentus}
                setNewShares={setNewShares}
              ></List>
            </TableLayout>

            <style jsx global>{`
              body,
              html {
                margin: 0px;
                color: white;
                background-color: #000000;
                font-family: "Baloo Bhaina 2", cursive;
                font-style: normal;
                font-display: swap;
              }
            `}</style>
          </section>
        </Template>
      )}
    </>
  );
};

export async function getServerSideProps() {
  let shares = await fetch(`${SHARE_API}/shares/indicators?optimized=true`);
  const { items } = await shares.json();
  return {
    props: {
      shares: items,
    },
  };
}
export default GoodIndicators;

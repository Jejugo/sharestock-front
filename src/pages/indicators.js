import React, { useState, useEffect, useContext } from "react";
import fetch from "isomorphic-unfetch";
import Navbar from "../components/Navbar";
import Router from "next/router";
import List from "../components/List";
import SearchBar from "../components/SearchBar";
import TableLayout from "../skeleton/TableLayout";
import Fonts from "../components/Fonts";
import config from "../configs";
import Template from "../components/Template";
import WishListPopUp from "../components/WishListPopUp";
import WishListProvider from "../context/WishList";
import { useAuth } from "../context/AuthUserContext";

const { SHARE_API } = config;

const Shares = (props) => {
  const [search, setSearch] = useState("");
  const [shares, setShares] = useState([]);
  const [goodShares, setGoodShares] = useState([]);
  const [isGoodShares, setIsGoodShares] = useState(false)
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
    const { shares, goodShares } = props;
    setShares(shares);
    setGoodShares(goodShares);
    window.addEventListener("scroll", handleScroll);
    //await redirectIfUserNotLoggedIn();
  }, []);

  const handleSearchBar = (e) => {
    setSearch(e.target.value);
    setFixTableHeader(false);
  };

  const goToFundamentus = (share) => {
    const router = Router;
    router.push(`https://statusinvest.com.br/acoes/${share.toLowerCase()}`);
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
        <Template tabTitle={"all-shares"}>
          <section className="home">
            <SearchBar
              handleSearchBar={handleSearchBar}
              value={search}
              placeholder={"Ativo"}
            ></SearchBar>
            <TableLayout>
              <WishListProvider>
                <List
                  fixTableHeader={fixTableHeader}
                  shares={isGoodShares ? goodShares : shares}
                  value={search}
                  setIsGoodShares={setIsGoodShares}
                  isGoodShares={isGoodShares}
                  goToFundamentus={goToFundamentus}
                ></List>
                <WishListPopUp></WishListPopUp>
              </WishListProvider>
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
  let shares = await fetch(`${SHARE_API}/shares/indicators`);
  let goodShares = await fetch(`${SHARE_API}/shares/indicators?optimized=true`);
  const { items: sharesItems } = await shares.json();
  const { items: goodSharesItems } = await goodShares.json();

  return {
    props: {
      shares: sharesItems,
      goodShares: goodSharesItems
    },
  };
}

export default Shares;

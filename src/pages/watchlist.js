import Template from "../components/Template";
import React, { useEffect, useState } from "react";
import Router from 'next/router'
import TableLayout from "../skeleton/TableLayout";
import SearchBar from "../components/SearchBar";
import Template from "../components/Template";
import { useAuth } from '../context/AuthUserContext'

const WatchList = () => {
  const { authUser } = useAuth()

  const redirectIfUserNotLoggedIn = async () => {
    const router = Router;
    await sleep(2000)
    if(!authUser) router.push('/login')
  }

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  return (
    <Template tabTitle={"watchlist"}>
      <section className="home">
        <SearchBar
          handleSearchBar={handleSearchBar}
          value={search}
          placeholder={"Ativo"}
        ></SearchBar>
        <TableLayout>
          <List
            fixTableHeader={fixTableHeader}
            shares={watchlistShares}
            value={search}
            goToFundamentus={goToFundamentus}
            setNewShares={setWatchlistShares}
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
  );
};

export default WatchList;

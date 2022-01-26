import Template from "../components/Template";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TableLayout from "../skeleton/TableLayout";
import SearchBar from "../components/SearchBar";
import Fonts from "../components/Fonts";
import Template from "../components/Template";

const WatchList = () => {
  useEffect(() => {
    Fonts();
  }, []);

  return (
    <Template tabTitle={"watchlist"}>
      <section className="home">
        <Navbar></Navbar>
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

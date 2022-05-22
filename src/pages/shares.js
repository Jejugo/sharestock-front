import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import Navbar from '../components/Navbar';
import Router from 'next/router';
import List from '../components/List';
import SearchBar from '../components/SearchBar';
import TableLayout from '../skeleton/TableLayout';
import Fonts from '../components/Fonts';
import config from '../configs';
import Template from '../components/Template'
import WishListPopUp from '../components/WishListPopUp'

const { SHARE_API } = config;

const Shares = (props) => {

  const [search, setSearch] = useState('')
  const [shares, setShares] = useState([])
  const [wishList, setWishList] = useState([])
  const [fixTableHeader, setFixTableHeader] = useState(false)

  useEffect(() => {
    Fonts()
    const { shareAsset } = props;
    setShares(shareAsset)
    window.addEventListener('scroll', handleScroll)
  }, [])

  const handleSearchBar = (e) => {
    setSearch(e.target.value)
    setFixTableHeader(false)
  }

  const goToFundamentus = (share) => {
    const router = Router;
    router.push(
      `https://statusinvest.com.br/acoes/${share.toLowerCase()}`
    );
  }

  const isTableHeaderFixed = (position) => position.top < 0

  const handleScroll = () => {
    const elem = document.getElementById("share-data")
    let position = elem.getBoundingClientRect();

    setFixTableHeader(isTableHeaderFixed(position))
  }

  return (
    <Template tabTitle={'all-shares'}>
      <section className='home'>
        <Navbar></Navbar>
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
            setNewShares={setShares}
            setWishList={setWishList}
          ></List>
          <WishListPopUp wishList={wishList} setWishList={setWishList}></WishListPopUp>
        </TableLayout>

        <style jsx global>{`
          body,
          html {
            margin: 0px;
            color: white;
            background-color: #000000;
            font-family: 'Baloo Bhaina 2', cursive;
            font-style: normal;
            font-display: swap;
          }
        `}</style>
      </section>
    </Template>
  );
}

export async function getServerSideProps() {
  let shares = await fetch(`${SHARE_API}/shares`)
  const { items } = await shares.json();
  return {
    props: {
      shareAsset: items
    }
  }
};

export default Shares;

import Head from 'next/head';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetch from 'isomorphic-unfetch';
import Navbar from '../components/Navbar';
import Router from 'next/router';
import List from '../components/List';
import SearchBar from '../components/SearchBar';
import Layout from '../skeleton/layout';
import Fonts from '../components/Fonts';
import actions from '../_redux/actions';
import { fetchShare, getAllShares } from '../_redux/actions/shares';
import config from '../configs';

const { SHARE_API } = config;



class Shares extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      shares: [],
      fixTableHeader: false
    };

    this.handleSearchBar = this.handleSearchBar.bind(this);
    this.goToFundamentus = this.goToFundamentus.bind(this);
    this.setNewShares = this.setNewShares.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.isTableHeaderFixed = this.isTableHeaderFixed.bind(this);
  }

  async componentDidMount() {
    Fonts()
    const { shares } = this.props;
    this.setState({
      shares
    })
    window.addEventListener('scroll', this.handleScroll)
  }

  handleSearchBar(e) {
    this.setState({
      search: e.target.value,
      fixTableHeader: false
    });
  }

  goToFundamentus(share) {
    const router = Router;
    router.push(
      `//fundamentus.com.br/detalhes.php?papel=${share.toUpperCase()}`
    );
  }

  setNewShares(shares){
    this.setState({
      shares
    })
  }

  isTableHeaderFixed(position){
    return position.top < 0
  }

  handleScroll(){
    const elem = document.getElementById("share-data")
    let position = elem.getBoundingClientRect();

    this.setState({
      fixTableHeader: this.isTableHeaderFixed(position)
    })
  }
  render() {
    const { search, shares, fixTableHeader } = this.state;

    return (
      <section className='home'>
        <Navbar></Navbar>
        <SearchBar
          handleSearchBar={this.handleSearchBar}
          value={search}
        ></SearchBar>
        <Layout>
          <List
            fixTableHeader={fixTableHeader}
            shares={shares}
            value={search}
            goToFundamentus={this.goToFundamentus}
            setNewShares={this.setNewShares}
          ></List>
        </Layout>

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
    );
  }
}

Shares.getInitialProps = async function () {
  let shares = await fetch(`${SHARE_API}/shares`)
  const { items } = await shares.json();
  
  return {
    shares: items
  }
};

export default Shares;

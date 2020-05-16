import Head from 'next/head'
import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Navbar from '../components/Navbar'
import Router from 'next/router'
import List from '../components/List'
import SearchBar from '../components/SearchBar'
import Layout from '../skeleton/layout'
import config from '../configs'
import Fonts from '../components/Fonts';

const { SHARE_API } = config
class GoodIndicators extends Component {

  constructor(props){
    super(props)
    this.state = {
      search: '',
      fixTableHeader: false
    }

    this.handleSearchBar = this.handleSearchBar.bind(this)
    this.goToFundamentus = this.goToFundamentus.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.isTableHeaderFixed = this.isTableHeaderFixed.bind(this)
  }
  
  componentDidMount(){
    Fonts()
    window.addEventListener('scroll', this.handleScroll)
  }

  handleSearchBar(e){
    this.setState({
      search: e.target.value,
      fixTableHeader: false
    })
  }

  goToFundamentus(share){
    const router = Router
    router.push(`//fundamentus.com.br/detalhes.php?papel=${share.toUpperCase()}`)
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

  render(){

    const { shares } = this.props; 
    const { search, fixTableHeader } = this.state
    return(
      <section className="home">
        <Navbar></Navbar>
        <SearchBar handleSearchBar={this.handleSearchBar} value={search} placeholder={"Ativo"}></SearchBar>
        <Layout>
          <List shares={shares} value={search} goToFundamentus={this.goToFundamentus} fixTableHeader={fixTableHeader}></List>
        </Layout>
    
        <style jsx global>{
        ` 
        body, html {
          margin: 1px;
          color: white;
          background-color: #000000;
          font-family: 'Baloo Bhaina 2', cursive;
          font-style: normal;
          font-display: swap;
        }
        `}</style>
        </section>
    )
  }
}

GoodIndicators.getInitialProps = async function(){
  let res = await fetch(`${SHARE_API}/goodShares`);
  const { items } = await res.json();

  return {
    shares: items
  };
}

export default GoodIndicators

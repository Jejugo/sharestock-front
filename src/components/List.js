import Head from "next/head";
import React, { Component } from "react";
import Table from './Lists/Table'
import Frames from './Lists/Frames'
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import CachedIcon from '@material-ui/icons/Cached';
import axios from  'axios';
import config from '../configs';
import { compose } from "redux";

const { SHARE_API } = config;

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listMode: 'table',
      loading: false
    };

    this.handleView = this.handleView.bind(this)
    this.syncData = this.syncData.bind(this)
  }

  handleView(e){
    e.preventDefault()
    const attributeName = e.currentTarget.getAttribute('name')

    this.setState({
      listMode: attributeName
    })
    window.scroll({top: 450, behavior: 'smooth' })
  }

  async syncData(e){
    const { setNewShares } = this.props;
    e.preventDefault();
    //this.setState({loading: true})
    await axios.get(`${SHARE_API}/sharesSync`)
    const newShares = await axios.get(`${SHARE_API}/shares`)
    //this.setState({loading: false})
    setNewShares(newShares)
  }

  render() {
    const { shares, value, goToFundamentus, fixTableHeader } = this.props;
    const { listMode, loading } = this.state;

    let filteredItems = shares.filter((item) =>
      item["Papel"].toUpperCase().includes(value.toUpperCase())
    )
    return (
      <section className="list">
        { loading && (<p>Loading...</p>)}
        <ul className="view">
        { <li className="view__item"> Foram encontradas {shares.length} ações. </li>}
          <div className="visualize__wrapper">
            <li className="view__item--click" name="table" onClick={(e) => this.handleView(e)}><FormatAlignJustifyIcon/></li>
            <li className="view__item--click" name="frames" onClick={(e) => this.handleView(e)}><ViewModuleIcon/></li>
            <li className="view__item--click" name="frames" onClick={(e) => this.syncData(e)}><CachedIcon/></li>
          </div>
        </ul>
        {listMode === 'table' && (
          <Table filteredItems={filteredItems} goToFundamentus={goToFundamentus} fixTableHeader={fixTableHeader}></Table>
        )}
        {listMode === 'frames' && (
          <Frames filteredItems={filteredItems} goToFundamentus={goToFundamentus}></Frames>
        )}
      <style jsx>{`
        .view {
          display: flex;
          justify-content: space-between;
          list-style: none;
        }

        .view__item {
          flex-basis: 30%;
          margin-bottom: 2%;
          margin-right: 50px;
          font-size: 20px;
        }

        .view__item--click{
          cursor: pointer;
          flex-basis: 20%;
          margin-bottom: 2%;
          margin-right: 50px;
          font-size: 20px;
        }

        .visualize__wrapper{
          display: flex;
        }
      `}</style>
      </section>
    );
  }
}

export default List;

import React, { useEffect, useState } from "react";
import Table from './Lists/Table'
import Frames from './Lists/Frames'
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import CachedIcon from '@material-ui/icons/Cached';
import axios from  'axios';
import config from '../configs';

const { SHARE_API } = config;

const List = (props) => {
  const { shares, value, goToFundamentus, fixTableHeader } = props
  const [listMode, setListMode] = useState('table')
  const [loading, setLoading] = useState(false)
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    setFilteredData(shares)
  }, [shares])

  useEffect(() => {
    setFilteredData(shares.filter((item) =>
      item["Papel"].toUpperCase().includes(value.toUpperCase())
    ))
  }, [value])

  const handleView = (e) => {
    e.preventDefault()
    const attributeName = e.currentTarget.getAttribute('name')

    setListMode(attributeName)
    window.scroll({top: 450, behavior: 'smooth' })
  }

  const syncData = async ({ setShares }) => {
    e.preventDefault();
    setLoading(true)
    await axios.get(`${SHARE_API}/sharesSync`)
    const newShares = await axios.get(`${SHARE_API}/shares`)
    setLoading(false)
    setShares(newShares)
  }

  return (
    <section className="list">
    { loading && (<p>Loading...</p>)}
    <ul className="view">
    { <li className="view__item"> Foram encontradas {shares.length} ações. </li>}
      <div className="visualize__wrapper">
        <li className="view__item--click" name="table" onClick={(e) => handleView(e)}><FormatAlignJustifyIcon/></li>
        <li className="view__item--click" name="frames" onClick={(e) => handleView(e)}><ViewModuleIcon/></li>
        <li className="view__item--click" name="frames" onClick={(e) => syncData(e)}><CachedIcon/></li>
      </div>
    </ul>
    {listMode === 'table' && (
      <Table filteredItems={filteredData} goToFundamentus={goToFundamentus} fixTableHeader={fixTableHeader}></Table>
    )}
    {listMode === 'frames' && (
      <Frames filteredItems={filteredData} goToFundamentus={goToFundamentus}></Frames>
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
  )
}

export default List;

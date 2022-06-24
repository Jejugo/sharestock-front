import React, { useEffect, useState, useContext } from "react";
import Table from './Lists/Table'
import Frames from './Lists/Frames'
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import CachedIcon from '@material-ui/icons/Cached';
import axios from  'axios';
import config from '../configs';
import { WishListContext } from '../context/WishList'

const { SHARE_API } = config;

const List = (props) => {
  const { shares, value, goToFundamentus, fixTableHeader, setIsGoodShares, isGoodShares } = props
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

  const syncData = async (e) => {
    const { setShares } = props
    e.preventDefault();
    setLoading(true)
    try {
      const data = await axios.get(`${SHARE_API}/shares/sync`)
      console.log(data)
      setLoading(false)
    } 
    catch(err){
      console.log('error: ', err)
      setLoading(false)
    }
    // const newShares = await axios.get(`${SHARE_API}/shares`)
    // 
    // setShares(newShares)
  }

  return (
    <section className="list">
    { loading && (<p>Loading...</p>)}
    <ul className="view">
    { <li className="view__item"> Foram encontradas {shares.length} ações. </li>}
      <div className="visualize__wrapper">
        <li className="view__item--click" name="table" onClick={(e) => handleView(e)}><FormatAlignJustifyIcon/></li>
        <li className="view__item--click" name="frames" onClick={(e) => handleView(e)}><ViewModuleIcon/></li>
        <li className="view__item--click" name="frames" onClick={syncData}><CachedIcon/></li>
        <li className="view__item--click" name="frames"><span className="view__item_highlight" onClick={() => setIsGoodShares(prevState => !prevState)}> { isGoodShares ? 'Todos os ativos' : 'Bons Ativos' }</span></li>
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

    .view__item_highlight {
      display: inline-block;
      margin-bottom: 8px;
      padding: 4px 8px;
      color: white;
      font-size: 16px;
      line-height: 1;
      font-weight: 700;
      background-color: green;
      border-radius: 15px;
      width: 150px;
      vertical-align: center;
      text-align: center;
      
    }

    .view__item--click{
      cursor: pointer;
      flex-basis: 20%;
      margin-bottom: 2%;
      margin-right: 50px;
      font-size: 20px;
    }

    .view__item--click:last-child{
      margin-right: 0;
    }

    .visualize__wrapper{
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
    }
  `}</style>
  </section>
  )
}

export default List;

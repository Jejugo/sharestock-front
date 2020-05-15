import React, { Component } from 'react'
import Head from 'next/head'

const SearchBar = ({ handleSearchBar, value }) => (
  <>
    <section className="search-navbar">
      <input className="search-navbar__input" onChange={ handleSearchBar } value={ value } placeholder="Ativo"/>
    </section>

    <style jsx>{`
      .search-navbar{
        width: 100%;
        display: flex;
        height: 250px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .search-navbar__input{
        margin: 0 auto;
        padding: 10px;
        border: none;
        border: 1px solid #ccc;
        border-radius: 5px;
        outline: none;
        font-size: 20px;
        width: 30%;
        color: black;
        height: 30px;
      }

      ::-webkit-input-placeholder {
        text-align: center;
      }
     
      :-moz-placeholder { /* Firefox 18- */
          text-align: center;  
      }
      
      ::-moz-placeholder {  /* Firefox 19+ */
          text-align: center;  
      }
      
      :-ms-input-placeholder {  
          text-align: center; 
      }

      .search-navbar__text{
        color: white;
      }

    `}</style>
  </>
)

export default SearchBar

import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Layout from "../skeleton/layout";
import SearchBar from '../components/SearchBar'
import { definitionsList } from "../const/definitions";
import Fonts from "../components/Fonts";
import Template from "../components/Template";

class Definitions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      definitionsList,
      search: '',
    };

    this.handleDef = this.handleDef.bind(this)
    this.handleSearchBar = this.handleSearchBar.bind(this)
  }

  componentDidMount() {
    Fonts();
  }

  handleSearchBar(e){
    this.setState({
      search: e.target.value,
    })
  }

  handleDef(e) {
    const id = e.target.getAttribute("name");
    this.setState((previousState) => ({
      definitionsList: previousState.definitionsList.map((def) =>
        def.id == id ? { ...def, showDef: !def.showDef } : def
      ),
    }));
  }

  render() {
    const { definitionsList, search } = this.state;
    let filteredItems = definitionsList.filter((item) =>
    item.alias.toUpperCase().includes(search.toUpperCase()) || 
    item.name.toUpperCase().includes(search.toUpperCase()))

    return (
      <Template>
        <section className="definitions">
          <Navbar></Navbar>
          <SearchBar handleSearchBar={this.handleSearchBar} value={search} placeholder={"Indicador"}></SearchBar>
          <Layout>
            <div className="definitions__list">
              {filteredItems.map((def) => {
                return !def.showDef ? (
                  <div
                    className="definitions__list_item"
                    name={def.id}
                    key={def.id}
                    onMouseEnter={this.handleDef}
                  >
                    {def.alias}
                  </div>
                ) : (
                  <div
                    className="definitions__list_item_desc"
                    name={def.id}
                    key={def.id}
                    onMouseLeave={this.handleDef}
                  >
                    <div className="">
                      <h3>{def.name}</h3>
                    </div>
                    {def.definition}
                  </div>
                );
              })}
            </div>
          </Layout>

          <style jsx global>{`
            body,
            html {
              margin: 0px;
              color: white;
              background-color: #000000;
              font-family: "Baloo Bhaina 2", cursive;
              font-style: normal;
              font-display: swap;
              line-height: 3vh;
            }
            .definitions__list {
              display: flex;
              flex-wrap: wrap;
            }

            .definitions__list_item {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              border: 1px solid white;
              flex-basis: 45.8%;
              margin: 1% 1%;
              padding: 1%;
              height: 40vh;
              transition: 0.3s ease-out;
              font-size: 35px;
              cursor: pointer;
            }

            @media (max-width: 1440px) {
              .definitions__list_item {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border: 1px solid white;
                flex-basis: 45.8%;
                margin: 1% 1%;
                padding: 1%;
                height: 40vh;
                transition: 0.3s ease-out;
                font-size: 35px;
                cursor: pointer;
              }

              .definitions__list_item_desc {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border: 1px solid white;
                flex-basis: 45.8%;
                margin: 1% 1%;
                padding: 1%;
                height: 40vh;
                font-size: 20px;
                cursor: pointer;
              }
            }

            @media (min-width: 1441px) {
              .definitions__list_item {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border: 1px solid white;
                flex-basis: 20.8%;
                margin: 1% 1%;
                padding: 1%;
                height: 40vh;
                transition: 0.3s ease-out;
                font-size: 35px;
                cursor: pointer;
              }

              .definitions__list_item_desc {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border: 1px solid white;
                flex-basis: 20.8%;
                margin: 1% 1%;
                padding: 1%;
                height: 40vh;
                font-size: 20px;
                cursor: pointer;
              }
            }

            .definitions__list_item:hover {
              background-color: grey;
              cursor: pointer;
            }
          `}</style>
        </section>
      </Template>
    );
  }
}

export default Definitions;

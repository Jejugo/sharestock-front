import React, { Component } from "react";
import { validator } from "../../validations/indicators";
import { render } from "react-dom";
import ShareModal from "../ShareModal";

const listClass = "list__shares_row_item";

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: { show: false, data: {} },
      headerFilter: {
        acao: false,
        cotacao: false,
        pl: false,
        pvp: false,
        evebitda:false,
        cresc5anos: false,
        dy: false,
        divbrutapl: false,
        liqcorrente: false,
        ml: false,
        roe: false
      }
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleTableFilter = this.handleTableFilter.bind(this);
  }

  showModal(item) {
    this.setState((previosuState) => ({
      showModal: { ...previosuState, show: true, data: item },
    }));
  }

  hideModal(){
    this.setState({
      showModal: { show: false, data: {}}
    })
  }

  handleTableFilter(e){
    e.preventDefault()
    const name = e.target.id

    this.setState(({ headerFilter }) => ({
      headerFilter: {
        ...headerFilter, 
        [name]: !headerFilter[name]
      }}))
  }

  render() {
    const { filteredItems, fixTableHeader } = this.props;
    const { headerFilter } = this.state;

    const {
      showModal: { show, data },
    } = this.state;

    const columnsToCheck = Object.keys(headerFilter).filter(key => headerFilter[key])

    const filterByColumnFilter = filteredItems
      .sort((a, b) => columnsToCheck
        .map(column => a[column] > b[column] ? 1 : -1))

    console.log(filterByColumnFilter)
    
    return (
      <>
        {show && <ShareModal data={data} hideModal={this.hideModal}/>}
        <section id="share-data" className={show ? "list__shares--blur" : "list__shares"}>
          <section className={fixTableHeader ? "list__shares_row--first--fixed" : "list__shares_row--first"}>
            <div className="list__shares_row_item--first" onClick={this.handleTableFilter} id="acao">Ação {headerFilter.acao ? `F`: `N`} </div>
            <div className="list__shares_row_item--first" onClick={this.handleTableFilter} id="cotacao">Cotação {headerFilter.cotacao ? `F`: `N`}</div>
            <div className="list__shares_row_item--first" onClick={this.handleTableFilter} id="pl">P/L {headerFilter.pl ? `F`: `N`}</div>
            <div className="list__shares_row_item--first" onClick={this.handleTableFilter} id="pvp">P/VP {headerFilter.pvp ? `F`: `N`}</div>
            <div className="list__shares_row_item--first" onClick={this.handleTableFilter} id="evebitda">EV/EBITDA {headerFilter.evebitda ? `F`: `N`}</div>
            <div className="list__shares_row_item--first" onClick={this.handleTableFilter} id="cresc5anos">Cresc 5 Anos {headerFilter.cresc5anos ? `F`: `N`}</div>
            <div className="list__shares_row_item--first" onClick={this.handleTableFilter} id="dy">DY. {headerFilter.dy ? `F`: `N`}</div>
            <div className="list__shares_row_item--first" onClick={this.handleTableFilter} id="divbrutapl">Div.Brut/Pat. {headerFilter.divbrutapl ? `F`: `N`}</div>
            <div className="list__shares_row_item--first" onClick={this.handleTableFilter} id="liqcorrente">Liq. Corrente {headerFilter.liqcorrente ? `F`: `N`}</div>
            <div className="list__shares_row_item--first" onClick={this.handleTableFilter} id="ml">Margem Liq {headerFilter.ml ? `F`: `N`}</div>
            <div className="list__shares_row_item--first" onClick={this.handleTableFilter} id="roe">ROE {headerFilter.roe ? `F`: `N`}</div>
          </section>
          {filterByColumnFilter.map((item, index) => {
            return (
              <section
                name={item["Papel"]}
                className="list__shares_row"
                onClick={() => this.showModal(item)}
                key={index}
              >
                <div className={validator(listClass, item, "Papel")}>
                  {item["Papel"]}
                </div>
                <div className={validator(listClass, item, "P/L")}>
                  {item["Cotação"]}
                </div>
                <div className={validator(listClass, item, "P/L")}>
                  {item["P/L"]}
                </div>
                <div className={validator(listClass, item, "P/L")}>
                  {item["P/VP"]}
                </div>
                <div className={validator(listClass, item, "Cotação")}>
                  {item["EV/EBITDA"]}
                </div>
                <div className={validator(listClass, item, "Cresc.5anos")}>
                  {item["Cresc.5anos"]}
                </div>
                <div className={validator(listClass, item, "Dividend Yield")}>
                  {item["Dividend Yield"]}
                </div>
                <div
                  className={validator(listClass, item, "Dívida Bruta/Patrim.")}
                >
                  {item["Dívida Bruta/Patrim."]}
                </div>
                <div className={validator(listClass, item, "Líq. Corrente")}>
                  {item["Líq. Corrente"] }
                </div>
                <div className={validator(listClass, item, "Margem Líquida")}>
                  {item["Margem Líquida"]}
                </div>
                <div className={validator(listClass, item, "ROE")}>
                  {item["ROE"]}
                </div>
              </section>
            );
          })}
          <style jsx>{`
            .list__shares_row {
              display: flex;
            }

            .list__shares_row_item {
              flex-basis: 20%;
              height: 50px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 15px;
            }

            .list__shares_row_item--first {
              flex-basis: 20%;
              height: 50px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 15px;
            }

            .list__shares_row--first {
              flex-basis: 20%;
              height: 50px;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .list__shares_row--first--fixed {
              width: 69.9%;
              flex-basis: 20%;
              height: 50px;
              display: flex;
              justify-content: center;
              align-items: center;
              position: fixed;
              top: 0;
              background-color: grey;
              opacity: 0.8
            }

            .list__shares_row:hover {
              background-color: grey;
              cursor: pointer;
              z-index: 2;
            }

            .good {
              background-color: rgb(94, 194, 94);
            }

            .alert {
              background-color: rgba(255, 255, 92, 0.742);
            }

            .bad {
              background-color: rgb(167, 60, 60);
            }
          `}</style>
        </section>
      </>
    );
  }
}

export default Table;

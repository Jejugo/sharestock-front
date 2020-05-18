import React, { Component } from "react";
import { validator } from "../../validations/indicators";
import { FaSort } from "react-icons/fa";
import ShareModal from "../ShareModal";

const listClass = "list__shares_row_item";

const Indicadores = [
  {id: 1, nome: "Papel", alias: "Papel", value: ""},
  {id: 2, nome: "Cotação", alias: "Cotação", value: ""},
  {id: 3, nome: "P/L", alias: "P/L", value: ""},
  {id: 4, nome: "P/VP", alias: "P/VP", value: ""},
  {id: 5, nome: "EV/EBITDA", alias: "EV/EBITDA", value: ""},
  {id: 6, nome: "Cresc.5anos", alias: "Cresc.5anos", value: ""},
  {id: 7, nome: "Dividend Yield", alias: "DY", value: ""},
  {id: 8, nome: "Dívida Bruta/Patrim.", alias: "DivBrut/PL", value: ""},
  {id: 9, nome: "Líq. Corrente", alias: "Liq. Corr.", value: ""},
  {id: 10, nome: "Margem Líquida", alias: "Marg. Liq.", value: ""},
  {id: 11, nome: "ROE", alias: "ROE", value: ""}
]

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: { show: false, data: {} },
      headerFilter: [
        {id: 1, nome: "Papel", alias: "Papel", value: ""},
        {id: 2, nome: "Cotação", alias: "Cotação", value: ""},
        {id: 3, nome: "P/L", alias: "P/L", value: ""},
        {id: 4, nome: "P/VP", alias: "P/VP", value: ""},
        {id: 5, nome: "EV/EBITDA", alias: "EV/EBITDA", value: ""},
        {id: 6, nome: "Cresc.5anos", alias: "Cresc.5anos", value: ""},
        {id: 7, nome: "Dividend Yield", alias: "DY", value: ""},
        {id: 8, nome: "Dívida Bruta/Patrim.", alias: "DivBrut/PL", value: ""},
        {id: 9, nome: "Líq. Corrente", alias: "Liq. Corr.", value: ""},
        {id: 10, nome: "Margem Líquida", alias: "Marg. Liq.", value: ""},
        {id: 11, nome: "ROE", alias: "ROE", value: ""}
      ],
      currentFilter: "",
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleTableFilter = this.handleTableFilter.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }

  updateItem(id, changeValue, currentFilter, reset = false){
    const index = this.state.headerFilter.findIndex(x=> x.id === id);

    const resetValues = [
      {id: 1, nome: "Papel", alias: "Papel", value: ""},
      {id: 2, nome: "Cotação", alias: "Cotação", value: ""},
      {id: 3, nome: "P/L", alias: "P/L", value: ""},
      {id: 4, nome: "P/VP", alias: "P/VP", value: ""},
      {id: 5, nome: "EV/EBITDA", alias: "EV/EBITDA", value: ""},
      {id: 6, nome: "Cresc.5anos", alias: "Cresc.5anos", value: ""},
      {id: 7, nome: "Dividend Yield", alias: "DY", value: ""},
      {id: 8, nome: "Dívida Bruta/Patrim.", alias: "DivBrut/PL", value: ""},
      {id: 9, nome: "Líq. Corrente", alias: "Liq. Corr.", value: ""},
      {id: 10, nome: "Margem Líquida", alias: "Marg. Liq.", value: ""},
      {id: 11, nome: "ROE", alias: "ROE", value: ""}
    ]

    if (index === -1)
      throw new Error('There was an error finding the element for #handleTableFilter() function ')
    if(!reset){
      return this.setState(({ headerFilter }) => ({
        headerFilter: [
           ...resetValues.slice(0,index),
           Object.assign({}, headerFilter[index], changeValue),
           ...resetValues.slice(index+1)
        ],
        currentFilter
      }))
    }

    this.setState(({ headerFilter }) => ({
      headerFilter: [
          ...headerFilter.slice(0,index),
          Object.assign({}, headerFilter[index], changeValue),
          ...headerFilter.slice(index+1)
      ],
      currentFilter
    }))
  }

  showModal(item) {
    this.setState((previosuState) => ({
      showModal: { ...previosuState, show: true, data: item },
    }));
  }

  hideModal() {
    this.setState({
      showModal: { show: false, data: {} },
    });
  }

  handleTableFilter(e) {
    e.preventDefault();
    const { headerFilter } = this.state
    const currentFilter = e.currentTarget.id
    const column = headerFilter.find(column => column.nome === currentFilter)

    if (column.value === "")
      return this.updateItem(column.id, { value: true }, currentFilter)
    
    this.updateItem(column.id, { value: !column.value }, currentFilter, true)
  }

  render() {
    const { filteredItems, fixTableHeader } = this.props;
    const { headerFilter, currentFilter } = this.state;
    const {
      showModal: { show, data },
    } = this.state;

    const column = headerFilter.find(column => column.nome === currentFilter)

    const filterByColumnFilter = filteredItems.sort((a, b) => {
      if(column){
        if (column.value)
          return a[currentFilter] > b[currentFilter] ? 1 : -1;
          
        return a[currentFilter] < b[currentFilter] ? 1 : -1;
      }
    });

    return (
      <>
        {show && <ShareModal data={data} hideModal={this.hideModal} />}
        <section
          id="share-data"
          className={show ? "list__shares--blur" : "list__shares"}
        >
          <section
            className={
              fixTableHeader
                ? "list__shares_row--first--fixed"
                : "list__shares_row--first"
            }
          >
            {Indicadores.map((indicador) => (
              <>
                <div className="list__shares_row_item--first">
                  <span>{indicador.alias}&nbsp;&nbsp;</span>
                  <div id={indicador.nome} className="icon" onClick={this.handleTableFilter}>
                    <FaSort />
                  </div>
                </div>
              </>
            ))}
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
                  {item["Líq. Corrente"]}
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
              opacity: 0.8;
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

            .icon {
              position: relative;
              top: 3px;
            }
          `}</style>
        </section>
      </>
    );
  }
}

export default Table;

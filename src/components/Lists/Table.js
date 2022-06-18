import React, { useContext } from "react";
import { validator } from "../../validations/indicators";
import { WishListContext } from '../../context/WishList';

const listClass = "list__shares_row_item";

const Table = ({ filteredItems, goToFundamentus, fixTableHeader }) => {
  const { setWishList, wishList } = useContext(WishListContext)
  const addToWatchList = (e, item) => {
    e.preventDefault()
    setWishList((previousState) => previousState.find(previousItem => previousItem.Papel === item.Papel) 
    ? previousState 
    : [...previousState, item])
  }

  return (
    <>
      <section id="share-data" className="list__shares">
        <section className={fixTableHeader ? "list__shares_row--first--fixed" : "list__shares_row--first"}>
          <div className="list__shares_row_item--first"></div>
          <div className="list__shares_row_item--first">Ação</div>
          <div className="list__shares_row_item--first">Cotação</div>
          <div className="list__shares_row_item--first">P/L</div>
          <div className="list__shares_row_item--first">P/VP</div>
          <div className="list__shares_row_item--first">EV/EBITDA</div>
          <div className="list__shares_row_item--first">Cresc 5 Anos</div>
          <div className="list__shares_row_item--first">DY.</div>
          <div className="list__shares_row_item--first">Div.Brut/Pat.</div>
          <div className="list__shares_row_item--first">Liq. Corrente</div>
          <div className="list__shares_row_item--first">Margem Liq</div>
          <div className="list__shares_row_item--first">ROE</div>
        </section>
        {filteredItems.map((item, index) => {
          return (
            <section
              name={item["Papel"]}
              className="list__shares_row"
              key={index}
            >
              <div className={validator(listClass)} onClick={(e) => addToWatchList(e, item)}>
                +
              </div>
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

export default Table;

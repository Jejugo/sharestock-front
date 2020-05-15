import React from "react";
import { validator } from "../../validations/indicators";

const listClass = 'share__desc'

export default function Frames({ filteredItems, goToFundamentus }) {
  return (
    <section id="share-data" className="list__shares">
      {filteredItems.map((item, index) => {
        return (
          <div
            className="list__shares_item"
						onClick={() => goToFundamentus(item["Papel"])}
						key={index}
          >
            <h1 className="share__title">{item["Papel"]}</h1>
            <h3 className="share__price">{item["Cotação"]}</h3>
            <p className={validator(listClass, item, "Cresc.5anos")}>Cresc5anos: {item["Cresc.5anos"]}</p>
            <p className={validator(listClass, item, "Dividend Yield")}>Dividend Y.: {item["Dividend Yield"]}</p>
            <p className={validator(listClass, item, "Dividend Yield")}>Liq Corrente: {item["Dividend Yield"]}</p>
            <p className={validator(listClass, item, "Dívida Bruta/Patrim.")}>Dívida/PL: {item["Dívida Bruta/Patrim."]}</p>
            <p className={validator(listClass, item, "Margem Líquida")}>Margem Líq: {item["Margem Líquida"]}</p>
            <p className={validator(listClass, item, "ROE")}>ROE: {item["ROE"]}</p>
          </div>
        );
      })}
      <style jsx>{`
        .list__shares {
          display: flex;
          flex-wrap: wrap
				}
				
				.list__shares_item{
					display: flex;
          flex-direction: column;
          align-items: center;
          border: 1px solid white;
          flex-basis: 15.5%;
          margin: 1% 1%;
          padding: 1%;
          height: 250px;
          transition: 0.3s ease-out;
        }
        
        .list__shares_item:hover{
					background-color: grey;
					cursor: pointer;
        }
        
        .share__title{
          font-size: 25px;
          margin: 0;
        }

        .share__price{
          font-size: 20px;
        }
        
        .share__desc{
          margin: 2px;
          line-height: 12pt
        }

        .good {
					color: rgb(94, 194, 94);
				}

				.alert {
					color: rgba(255, 255, 92, 0.742);
				}

				.bad {
					color: rgb(167, 60, 60);
				}
      `}</style>
    </section>
  );
}

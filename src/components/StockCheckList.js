import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import { useAuth } from "../context/AuthUserContext";
import Firestore from "../firebase/Firestore";

export default function StockCheckList({
  statements,
  setStatements,
  handleStatementCheck,
  assetValue,
  assetsToInvest = null,
}) {
  const { authUser } = useAuth();

  const filterAssetStatements = (assetStatements) => {
    const statementsArray = statements.map((statement) => statement.statement);
    const weightArray = statements.map((statement) => statement.weight);
    const filteredAssets1 = assetStatements.map((statement, index) => {
      if (statementsArray.includes(statement.statement)) {
        return {
          ...statement,
          weight: weightArray[index],
        };
      }
      return null;
    });
    return filteredAssets1.filter((a) => a);
  };

  useEffect(async () => {
    if (assetValue) {
      const assetStatements = await Firestore().getAllItems({
        collection: "userAssetStatements",
        id: authUser.uid,
      });
      let strategyStatements = await Firestore().getAllItems({
        collection: "userStrategyStatements",
        id: authUser.uid,
      });
      strategyStatements = Object.keys(strategyStatements).map(
        (key) => strategyStatements[key]
      );
      const sameStatements = [];
      let assetsStatementsFiltered = [];
      if (assetsToInvest && assetsToInvest.hasOwnProperty(assetValue)) {
        assetsStatementsFiltered = filterAssetStatements(
          assetsToInvest[assetValue]
        );
        for (let { statement } of statements) {
          for (let assetStatement of assetsStatementsFiltered) {
            if (assetStatement.statement === statement) {
              sameStatements.push(statement);
            }
          }
        }

        const filteredStatements = statements.filter(
          (statement) => !sameStatements.includes(statement.statement)
        );
        setStatements([...assetsStatementsFiltered, ...filteredStatements]);
      } else if (assetStatements.hasOwnProperty(assetValue)) {
        assetsStatementsFiltered = filterAssetStatements(
          assetStatements[assetValue]
        );
        for (let { statement } of statements) {
          for (let assetStatement of assetsStatementsFiltered) {
            if (assetStatement.statement === statement) {
              sameStatements.push(statement);
            }
          }
        }

        const filteredStatements = statements.filter(
          (statement) => !sameStatements.includes(statement.statement)
        );
        setStatements([...assetsStatementsFiltered, ...filteredStatements]);
      } else {
        setStatements([...strategyStatements]);
      }
    }
  }, [assetValue]);

  return (
    <section>
      <section className="stock-checklist">
        <ul className="stock-checklist__list">
          {statements.length > 0 &&
            statements.map(({ statement, checked }, index) => (
              <li className="stock-checklist__list_item">
                <div className="stock-checklist__list_item--wrapper">
                  <p>{statement}</p>
                  <Switch
                    onChange={(e) => handleStatementCheck(e, index)}
                    checked={checked}
                    disabled={!assetValue}
                  />
                </div>
              </li>
            ))}
        </ul>
      </section>
      <style>{`
        p {
          color: white;
        }
        .stock-checklist__title, 
        .stock-checklist__dropdown{
          text-align: center;
        }

        .stock-checklist__title{
          font-size: 24px;
        }

        .stock-checklist__dropdown_wrapper{
          text-align: center;
        }


        .stock-checklist__dropdown{
          font-size: 18px;
          padding: 5px 15px;
        }

        .stock-checklist__list{
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .stock-checklist__list_item{
          margin: 20px 0;
          background-color: #1E1E1E;
          padding: 2px 10px;
          border-radius: 5px;
        }

        .stock-checklist__list_item--wrapper{
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .strategy-form__back{
          position: absolute;
          left: 10px;
          top: 10%;
        }
        .strategy-form__buttons{
          display: flex;
          justify-content: space-around;
          width: 60%;
          margin: 0 auto;
        }
        .strategy-form__buttons_btn{
          padding: 5px 20px;
          border: none;
          font-size: 16px;
          border-radius: 5px;
          margin: 20px 0 50px 0;
        }
        .strategy-form__list{
          list-style: none;
          padding: 0;
        }
        .strategy-form__list_item{
          margin: 5px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .strategy-form__list_item--remove{
          cursor: pointer;
        }
        .strategy-form__button{
          padding: 5px;
          margin-right: 5px;
        }
        .strategy-form__input{
          padding: 5px;
          margin-right: 5px;
        }
        .strategy-form__input_statement{
          width: 300px;
        }

      `}</style>
    </section>
  );
}

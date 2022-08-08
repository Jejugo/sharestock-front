import React, { useState, useEffect } from "react";

export default function useWalletResistancePoints (){

    const [walletResistancePoints, setWalletResistancePoints] = useState({});

    const storeAssetStatements = async () => {
        try {
          await Firestore().addListAsObjectsWithList({
            collection: "userAssetStatements",
            id: authUser.uid,
            list: statements,
            key: assetValue,
          });
    
          uncheckStatements();
        } catch (err) {
          console.error(err);
        }
      };

    const storeAssetAndCalculate = async () => {
        await storeAssetStatements();
        const data = await Firestore().getAllItems({
          collection: "userAssetStatements",
          id: authUser.uid,
        });
        const result = Object.keys(data).reduce(
          (acc, assetKey) => ({
            ...acc,
            [assetKey]: data[assetKey].reduce((acc, statement) => {
              if (statement.checked) return acc + 1 * statement.weight;
              if (!statement.checked) return acc + -1 * statement.weight;
            }, 0),
          }),
          {}
        );
        setWalletResistancePoints(result);
        setShowSuggestedPercentages(true);
      };

      return {
        storeAssetAndCalculate,
        walletResistancePoints
      }
    
}
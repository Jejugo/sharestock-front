import React, { useState, useEffect } from "react";

const NEGATIVE_DEFAULT = 0.01

export default function SuggestedPercentages({ walletResistancePoints }) {
  const [walletSuggestedPercentages, setWalletSuggestedPercentages] = useState(
    []
  );

  const calculatePercentages = (resistancePoints) => {
    const positiveAssets = Object.entries(resistancePoints).map(
      ([key, val]) =>
        resistancePoints[key] >= 0 && {
          name: key,
          points: resistancePoints[key],
        }
    ).filter(a => a);

    const negativeAssets = Object.entries(resistancePoints).map(
      ([key, val]) => {
        if (resistancePoints[key] < 0) {
          return {
            name: key,
            points: resistancePoints[key],
          };
        }
      }
    ).filter(a => a);

    const negativeAssetCalculation = negativeAssets.length &&
    negativeAssets.reduce(
        (acc, asset, index) => ({
          ...acc,
          [asset.name]: NEGATIVE_DEFAULT,
        }),
        {}
      );

    const valueToTake =
      ((NEGATIVE_DEFAULT * Object.keys(negativeAssetCalculation).length) /
      positiveAssets.length).toFixed(4);

    const positveAssetCalculation = positiveAssets.reduce(
      (acc, asset) => ({
        ...acc,
        [asset.name]:   
          (asset.points /
            positiveAssets.reduce((acc, asset) => acc + asset.points, 0)) -
          valueToTake,
      }),
      {}
    );

    const percentagesArray = Object.entries({
        ...positveAssetCalculation,
        ...negativeAssetCalculation,
      }).map(([key, value]) => ({
          name: key,
          percentage: value
      }))

    return percentagesArray;
  };

  useEffect(() => {
    const percentagesResult = calculatePercentages(walletResistancePoints);
    setWalletSuggestedPercentages(percentagesResult)
  }, []);

  return (
    <section>
      <h1>Essas são as porcentages recomendadas para sua carteira:</h1>
      <ul>
          {
              walletSuggestedPercentages.map(asset => (
                <li>
                    <span>{asset.name} </span><span> { asset.percentage } </span>
                </li>
              ))
          }
      </ul>    
    </section>
  );
}

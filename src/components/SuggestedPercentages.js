import React, { useState, useEffect } from "react";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

const NEGATIVE_DEFAULT = 0.01;

export default function SuggestedPercentages({
  walletResistancePoints,
  setShowSuggestedPercentages,
  removeAssets
}) {
  const [walletSuggestedPercentages, setWalletSuggestedPercentages] = useState(
    []
  );
  const [resistancePointsFormatted, setResistancePointsFormatted] = useState(
    []
  );

  const calculatePercentages = (resistancePoints) => {
    const positiveAssets = Object.entries(resistancePoints)
      .map(
        ([key, val]) =>
          resistancePoints[key] >= 0 && {
            name: key,
            points: resistancePoints[key],
          }
      )
      .filter((a) => a);

    const negativeAssets = Object.entries(resistancePoints)
      .map(([key, val]) => {
        if (resistancePoints[key] < 0) {
          return {
            name: key,
            points: resistancePoints[key],
          };
        }
      })
      .filter((a) => a);

    const negativeAssetCalculation =
      negativeAssets.length &&
      negativeAssets.reduce(
        (acc, asset, index) => ({
          ...acc,
          [asset.name]: NEGATIVE_DEFAULT,
        }),
        {}
      );

    const valueToTake = (
      (NEGATIVE_DEFAULT * Object.keys(negativeAssetCalculation).length) /
      positiveAssets.length
    ).toFixed(4);

    const positveAssetCalculation = positiveAssets.reduce(
      (acc, asset) => ({
        ...acc,
        [asset.name]:
          asset.points /
            positiveAssets.reduce((acc, asset) => acc + asset.points, 0) -
          valueToTake,
      }),
      {}
    );

    const percentagesArray = Object.entries({
      ...positveAssetCalculation,
      ...negativeAssetCalculation,
    }).map(([key, value]) => ({
      name: key,
      percentage: `${value.toFixed(3) * 100}%`,
      points: resistancePoints[key],
    }));

    setResistancePointsFormatted(
      Object.entries(resistancePoints).map(([key, value]) => ({
        name: key,
        points: value,
      }))
    );
    return percentagesArray;
  };

  useEffect(() => {
    const percentagesResult = calculatePercentages(walletResistancePoints);
    setWalletSuggestedPercentages(percentagesResult);
  }, [walletResistancePoints]);

  return (
    <section className="suggested_percentages">
      <h1 className="suggested_percentages__title">
        <i>Essas são as porcentages recomendadas para sua carteira:</i>
      </h1>
      <ul className="suggested_percentages__list">
        <tr className="suggested_percentages__list_item--header">
          <th>Name</th>
          <th>Resistencia</th>
          <th>Sugestão</th>
          <th>bla</th>
        </tr>
        {walletSuggestedPercentages.map((asset) => (
          <td className="suggested_percentages__list_item--row">
            <span>{asset.name} </span>
            <span>{asset.points}</span>
            <span>{asset.percentage}</span>
            {/* TODO REMOVE ON CLICK*/}
            <span onClick={() => removeAssets(asset.name)}>trash</span> 
          </td>
        ))}
      </ul>
      <style>{`
        .suggested_percentages__back_wrapper{
          display: flex;
          align-items: center;
        }
        .suggested_percentages__back{
          position: relative;
          left: -30%;
          top: 10%;
          cursor: pointer;
        }
        .suggested_percentages__title{
          margin: 15px 0;
          font-size: 18px;
          color: white;
        }
        .suggested_percentages__list{
          padding: 0;
          list-style: none;
          color: white;
        }
        .suggested_percentages__list_item{
          margin: 10px 0px;
          font-size: 18px;
          color: white;
        }
        .suggested_percentages__list_item--header, .suggested_percentages__list_item--row{
          display: flex;
          justify-content: space-between;
          color: white;
        }
      `}</style>
    </section>
  );
}

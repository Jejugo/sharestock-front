import React, { useState, useEffect } from 'react';
import calculateAssetPercentages from '../builders/calculateAssetPercentages';
import DeleteIcon from '@mui/icons-material/Delete';

export default function SuggestedPercentages({
	walletResistancePoints,
	removeAssets,
}) {
	const [walletSuggestedPercentages, setWalletSuggestedPercentages] = useState(
		[],
	);
	const [, setResistancePointsFormatted] = useState([]);

	const formatResistancePoints = resistancePoints =>
		Object.entries(resistancePoints).map(([key, value]) => ({
			name: key,
			points: value,
		}));

	const setPercentages = resistancePoints => {
		const percentagesArray = calculateAssetPercentages(resistancePoints);
		const formattedResistancePoints = formatResistancePoints(resistancePoints);

		setResistancePointsFormatted(formattedResistancePoints);
		return percentagesArray;
	};

	useEffect(() => {
		const percentagesResult = setPercentages(walletResistancePoints);
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
					<th>trash</th>
				</tr>
				{walletSuggestedPercentages.map((asset, index) => (
					<td className="suggested_percentages__list_item--row" key={index}>
						<span>{asset.name} </span>
						<span>{asset.points}</span>
						<span>{asset.percentage}</span>
						{/* TODO REMOVE ON CLICK*/}
						<span className="" onClick={() => removeAssets(asset.name)}>
							<DeleteIcon></DeleteIcon>
						</span>
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

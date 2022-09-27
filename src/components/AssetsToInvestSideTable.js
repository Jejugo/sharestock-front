import React from 'react';
import SuggestedPercentages from './SuggestedPercentages';

export default function AssetsToInvestSideTable({ walletResistancePoints, setShowSuggestedPercentages, removeAssets}) {
	return (
		<section className="assets_to_invest_side_table">
			<h1>Porcentagens de Risco</h1>
			<SuggestedPercentages
				walletResistancePoints={walletResistancePoints}
				setShowSuggestedPercentages={setShowSuggestedPercentages}
				removeAssets={removeAssets}
			></SuggestedPercentages>
			<div className="assets_to_invest_side_table__"></div>
			<style>{`
                h1 {
                    color: white;
                    font-size: 30px;
                    padding: 0;
                    margin: 0;
                    text-align: center;
                }
            `}</style>
		</section>
	);
}

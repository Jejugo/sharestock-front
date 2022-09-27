import React, { useState, useEffect } from 'react';
import Template from '../skeleton/Template/Template';
import StrategyForm from '../components/StrategyForm';
import config from '../configs';

const { SHARE_API } = config;

const Strategy = props => {
	const [shares, setShares] = useState([]);

	useEffect(() => {
		const { shares } = props;
		setShares(shares);
	});

	return (
		<Template tabTitle={'strategy'}>
			<StrategyForm shares={shares}></StrategyForm>
		</Template>
	);
};

export async function getServerSideProps() {
	let shares = await fetch(`${SHARE_API}/shares/all`);
	const sharesItems = await shares.json();

	return {
		props: {
			shares: sharesItems,
		},
	};
}

export default Strategy;

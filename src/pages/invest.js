import React, { useState, useEffect } from 'react';
import Template from '../skeleton/Template/Template';
import InvestComponent from '../components/InvestComponent';
import { useAuth } from '../context/AuthUserContext';
import config from '../configs';

const { SHARE_API } = config;   

export default function Invest(props) {
	const { authUser } = useAuth();
	const [shares, setShares] = useState([]);
	const [sharesMap, setSharesMap] = useState([]);
	const [normalizedShares, setNormalizedShares] = useState([]);

	useEffect(() => {
		const { normalizedShares, shares, sharesMap } = props;
		setNormalizedShares(normalizedShares);
		setShares(shares);
		setSharesMap(sharesMap);
	});

	return (
		<section className="dashboard">
			{authUser && (
				<Template tabTitle={'dashboard'}>
					<InvestComponent shares={shares} normalizedShares={normalizedShares} sharesMap={sharesMap}></InvestComponent>
				</Template>
			)}
		</section>
	);
}

export async function getServerSideProps() {
	let data = await fetch(`${SHARE_API}/shares/all`);
	const { items: sharesItems } = await data.json();
	const normalizeShareItems = sharesItems.map(item => ({value: item['Papel'].toLowerCase(), label: `${item['nome']} - ${item['Papel']}` }));
	const sharesMap = sharesItems.reduce((acc, curr) => ({
		...acc,
		[curr['Papel'].toLowerCase()]: curr,
	}));
	return {
		props: {
			normalizedShares: normalizeShareItems,
			shares: sharesItems,
			sharesMap
		},
	};
}

import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Template from '../skeleton/Template/Template';
import StrategyForm from '../components/StrategyForm';
import { useAuth } from '../context/AuthUserContext';
import config from '../configs';

const { SHARE_API } = config;

const Strategy = (props) => {
	const { authUser } = useAuth();
	const [shares, setShares] = useState([]);

	const redirectIfUserNotLoggedIn = async () => {
		const router = Router;
		await sleep(2000);
		if (!authUser) router.push('/login');
	};

	const sleep = (ms) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};

	useEffect(() => {
		const { shares } = props;
		setShares(shares);
	});

	return (
		<>
			{authUser && (
				<Template tabTitle={'strategy'}>
					<StrategyForm shares={shares}></StrategyForm>
				</Template>
			)}
		</>
	);
};

export async function getServerSideProps() {
	let shares = await fetch(`${SHARE_API}/shares/all`);
	const sharesItems = await shares.json();

	return {
		props: {
			shares: sharesItems
		},
	};
}

export default Strategy;
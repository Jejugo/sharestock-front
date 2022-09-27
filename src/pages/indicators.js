import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import Table from '../components/Table/Table';
import SearchBar from '../components/SearchBar/SearchBar';
import TableLayout from '../skeleton/TableLayout/TableLayout';
import config from '../configs';
import Template from '../skeleton/Template/Template';
import WishListPopUp from '../components/WishListPopUp';
import WishListProvider from '../context/WishList';

const { SHARE_API } = config;

const Indicators = props => {
	const [search, setSearch] = useState('');
	const [shares, setShares] = useState([]);
	const [goodShares, setGoodShares] = useState([]);
	const [isGoodShares, setIsGoodShares] = useState(false);
	const [fixTableHeader, setFixTableHeader] = useState(false);

	useEffect(async () => {
		const { shares, goodShares } = props;
		setShares(shares);
		setGoodShares(goodShares);
		console.log('scrolling...');
		window.addEventListener('scroll', handleScroll);
	}, []);

	const handleSearchBar = e => {
		setSearch(e.target.value);
		setFixTableHeader(false);
	};

	const goToFundamentus = share => {
		const router = Router;
		router.push(`https://statusinvest.com.br/acoes/${share.toLowerCase()}`);
	};

	const isTableHeaderFixed = position => position.top < 0;

	const handleScroll = () => {
		const elem = document.getElementById('share-data');
		let position = elem.getBoundingClientRect();
		
		setFixTableHeader(isTableHeaderFixed(position));
	};

	return (
		<>
			<Template tabTitle={'all-shares'}>
				<section>
					<SearchBar
						handleSearchBar={handleSearchBar}
						value={search}
						placeholder={'Ativo'}
					></SearchBar>
					<TableLayout>
						<WishListProvider>
							<Table
								fixTableHeader={fixTableHeader}
								shares={isGoodShares ? goodShares : shares}
								value={search}
								setIsGoodShares={setIsGoodShares}
								isGoodShares={isGoodShares}
								goToFundamentus={goToFundamentus}
							></Table>
							<WishListPopUp></WishListPopUp>
						</WishListProvider>
					</TableLayout>
				</section>
			</Template>
		</>
	);
};

export async function getServerSideProps() {
	let shares = await fetch(`${SHARE_API}/shares/indicators`);
	let goodShares = await fetch(`${SHARE_API}/shares/indicators?optimized=true`);
	const { items: sharesItems } = await shares.json();
	const { items: goodSharesItems } = await goodShares.json();

	return {
		props: {
			shares: sharesItems,
			goodShares: goodSharesItems,
		},
	};
}

export default Indicators;

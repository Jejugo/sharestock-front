import Template from '../components/Template';
import React from 'react';
import TableLayout from '../skeleton/TableLayout';
import SearchBar from '../components/SearchBar';

const WatchList = () => {
	return (
		<Template tabTitle={'watchlist'}>
			<section className="home">
				<SearchBar
					handleSearchBar={handleSearchBar}
					value={search}
					placeholder={'Ativo'}
				></SearchBar>
				<TableLayout>
					<List
						fixTableHeader={fixTableHeader}
						shares={watchlistShares}
						value={search}
						goToFundamentus={goToFundamentus}
						setNewShares={setWatchlistShares}
					></List>
				</TableLayout>

				<style jsx global>{`
          body,
          html {
            margin: 0px;
            color: white;
            background-color: #000000;
            font-family: 'Baloo Bhaina 2', cursive;
            font-style: normal;
            font-display: swap;
          }
        `}</style>
			</section>
		</Template>
	);
};

export default WatchList;

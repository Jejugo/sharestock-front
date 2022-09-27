import React, { useEffect, useState } from 'react';
import Rows from '../TableLists/Rows/Rows';
import Frames from '../TableLists/Frames/Frames';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import CachedIcon from '@material-ui/icons/Cached';
import axios from 'axios';
import config from '../../configs';
import * as S from './styles';

const { SHARE_API } = config;

const Table = props => {
	const {
		shares,
		value,
		goToFundamentus,
		fixTableHeader,
		setIsGoodShares,
		isGoodShares,
	} = props;
	const [listMode, setListMode] = useState('table');
	const [loading, setLoading] = useState(false);
	const [filteredData, setFilteredData] = useState([]);

	useEffect(() => {
		setFilteredData(shares);
	}, [shares]);

	useEffect(() => {
		setFilteredData(
			shares.filter(item =>
				item['Papel'].toUpperCase().includes(value.toUpperCase()),
			),
		);
	}, [value]);

	const handleView = e => {
		e.preventDefault();
		const attributeName = e.currentTarget.getAttribute('name');

		setListMode(attributeName);
		window.scroll({ top: 450, behavior: 'smooth' });
	};

	const syncData = async e => {
		e.preventDefault();
		setLoading(true);
		try {
			const data = await axios.get(`${SHARE_API}/shares/sync`);
			setLoading(false);
		} catch (err) {
			console.error('error: ', err);
			setLoading(false);
		}
	};

	return (
		<section>
			{loading && <p>Loading...</p>}
			<S.TableHeaderIcons>
				{
					<S.TableHeaderIcon>
            Foram encontradas {shares.length} ações.
					</S.TableHeaderIcon>
				}
				<S.TableHeaderIconsRight>
					<S.TableHeaderIcon
						clickable
						name="table"
						onClick={e => handleView(e)}
					>
						<FormatAlignJustifyIcon />
					</S.TableHeaderIcon>
					<S.TableHeaderIcon
						clickable
						name="frames"
						onClick={e => handleView(e)}
					>
						<ViewModuleIcon />
					</S.TableHeaderIcon>
					<S.TableHeaderIcon clickable onClick={syncData}>
						<CachedIcon />
					</S.TableHeaderIcon>
					<S.TableHeaderIcon clickable>
						<S.Highlight
							onClick={() => setIsGoodShares(prevState => !prevState)}
						>
							{isGoodShares ? 'Todos os ativos' : 'Bons Ativos'}
						</S.Highlight>
					</S.TableHeaderIcon>
				</S.TableHeaderIconsRight>
			</S.TableHeaderIcons>
			{listMode === 'table' && (
				<Rows
					filteredItems={filteredData}
					goToFundamentus={goToFundamentus}
					fixTableHeader={fixTableHeader}
				></Rows>
			)}
			{listMode === 'frames' && (
				<Frames
					filteredItems={filteredData}
					goToFundamentus={goToFundamentus}
				></Frames>
			)}
			<style jsx>{`
        .view {
          display: flex;
          justify-content: space-between;
          list-style: none;
        }

        .view__item {
          flex-basis: 30%;
          margin-bottom: 2%;
          margin-right: 50px;
          font-size: 20px;
        }

        .view__item_highlight {
          display: inline-block;
          margin-bottom: 8px;
          padding: 4px 8px;
          color: white;
          font-size: 16px;
          line-height: 1;
          font-weight: 700;
          background-color: green;
          border-radius: 15px;
          width: 150px;
          vertical-align: center;
          text-align: center;
        }

        .view__item--click {
          cursor: pointer;
          flex-basis: 20%;
          margin-bottom: 2%;
          margin-right: 50px;
          font-size: 20px;
        }

        .view__item--click:last-child {
          margin-right: 0;
        }

        .visualize__wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0;
        }
      `}</style>
		</section>
	);
};

export default Table;

import React, { useState } from 'react';
import TableLayout from '../skeleton/TableLayout/TableLayout';
import SearchBar from '../components/SearchBar/SearchBar';
import { definitionsList } from '../const/definitions';
import Template from '../skeleton/Template/Template';
import DefinitionList from '../components/DefinitionList/DefinitionList';

const Definitions = () => {
	const [defList, setDefList] = useState(definitionsList);
	const [search, setSearch] = useState('');

	const filteredItems = defList.filter(
		item =>
			item.alias.toUpperCase().includes(search.toUpperCase()) ||
      item.name.toUpperCase().includes(search.toUpperCase()),
	);

	const handleDef = e => {
		const id = parseInt(e.target.getAttribute('name'));
		setDefList(previousState =>
			previousState.map(def => {
				if (def.id === id) {
					return { ...def, showDef: !def.showDef };
				}
				return def;
			}),
		);
	};

	return (
		<>
			<Template tabTitle={'indicators'}>
				<section>
					<SearchBar
						handleSearchBar={e => setSearch(e.target.value)}
						value={search}
						placeholder={'Indicador'}
					></SearchBar>
					<TableLayout>
						<DefinitionList
							filteredItems={filteredItems}
							handleDef={handleDef}
						></DefinitionList>
					</TableLayout>
				</section>
			</Template>
		</>
	);
};

export default Definitions;

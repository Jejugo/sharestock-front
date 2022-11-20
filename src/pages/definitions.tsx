import React, { useState } from 'react'
import TableLayout from '../layout/TableLayout/TableLayout'
import SearchBar from '../components/SearchBar/SearchBar'
import { definitionsList, Definitions } from '../const/definitions'
import Template from '../layout/Template/Template'
import DefinitionList from '../features/definitions/DefinitionList/DefinitionList'

const Definitions = () => {
  const [defList, setDefList] = useState<Definitions[]>(definitionsList)
  const [search, setSearch] = useState<string>('')

  const filteredItems = defList.filter(
    (item: Definitions) =>
      item.alias.toUpperCase().includes(search.toUpperCase()) ||
      item.name.toUpperCase().includes(search.toUpperCase())
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleDef = (e: any): void => {
    const id = parseInt(e.target.getAttribute('name'))
    setDefList((previousState: Definitions[]) =>
      previousState.map((def: Definitions) => {
        if (def.id === id) {
          return { ...def, showDef: !def.showDef }
        }
        return def
      })
    )
  }

  return (
    <>
      <Template tabTitle={'indicators'}>
        <section>
          <SearchBar
            setSearchText={handleSearch}
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
  )
}

export default Definitions

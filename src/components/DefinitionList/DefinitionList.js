import * as S from './styles';

export default function DefinitionList({ filteredItems, handleDef }) {
  return (
    <S.DefinitionsList>
      {filteredItems.map(def => {
        return !def.showDef ? (
          <S.DefinitionsListItem
            name={def.id}
            key={def.id}
            onMouseEnter={handleDef}
          >
            {def.alias}
          </S.DefinitionsListItem>
        ) : (
          <S.DefinitionListItemDesc
            name={def.id}
            key={def.id}
            onMouseLeave={handleDef}
          >
            <div className="">
              <h3>{def.name}</h3>
            </div>
            {def.definition}
          </S.DefinitionListItemDesc>
        );
      })}
    </S.DefinitionsList>
  );
}

import React from 'react'
import * as S from './styles'
import { Definitions } from 'const/definitions'
interface DefinitionListProps {
  items: Definitions[]
  handleDef?: (e: any) => void
}

export default function DefinitionList({
  items,
  handleDef
}: DefinitionListProps) {
  return (
    <S.DefinitionsList>
      {items.map((def) => {
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
        )
      })}
    </S.DefinitionsList>
  )
}

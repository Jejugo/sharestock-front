import styled from 'styled-components'
import { IDefinitionListItemDesc, IDefinitionsListItem } from './interfaces'

const definitionsListItemStyles = `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  border-radius: 10px;
  margin: 1% 1%;
  padding: 1%;
  height: 40vh;
  transition: 0.3s ease-out;
  font-size: 35px;
  cursor: pointer;

  &:hover {
    background-color: grey;
    cursor: pointer;
  }
`

export const DefinitionsList = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;
`

export const DefinitionsListItem = styled.div<IDefinitionsListItem>`
  ${definitionsListItemStyles}
  flex-basis: 45.8%;

  @media (min-width: 1441px) {
    ${definitionsListItemStyles}
    flex-basis: 20.8%;
  }
`

export const DefinitionListItemDesc = styled.div<IDefinitionListItemDesc>`
  ${definitionsListItemStyles}
  flex-basis: 45.8%;
  font-size: 20px;

  @media (min-width: 1441px) {
    ${definitionsListItemStyles}
    flex-basis: 20.8%;
    font-size: 20px;
  }
`

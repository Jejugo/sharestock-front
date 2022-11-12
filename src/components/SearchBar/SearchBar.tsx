import React from 'react'
import * as S from './styles'

interface SearchBarProps {
  handleSearchBar: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  placeholder: string
}

const SearchBar = ({ handleSearchBar, value, placeholder }: SearchBarProps) => (
  <>
    <S.SearchBar>
      <S.SearchBarInput
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleSearchBar(e)
        }
        value={value}
        placeholder={placeholder}
      />
    </S.SearchBar>
  </>
)

export default SearchBar

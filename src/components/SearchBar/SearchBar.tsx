import React from 'react'
import * as S from './styles'

interface SearchBarProps {
  setSearchText: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  placeholder: string
}

const SearchBar = ({ setSearchText, value, placeholder }: SearchBarProps) => (
  <S.SearchBar>
    <S.SearchBarInput
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e)}
      value={value}
      placeholder={placeholder}
    />
  </S.SearchBar>
)

export default SearchBar

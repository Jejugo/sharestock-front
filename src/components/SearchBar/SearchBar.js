import React from 'react';
import * as S from './styles';

const SearchBar = ({ handleSearchBar, value, placeholder }) => (
  <>
    <S.SearchBar>
      <S.SearchBarInput
        onChange={handleSearchBar}
        value={value}
        placeholder={placeholder}
      />
    </S.SearchBar>
  </>
);

export default SearchBar;

import styled from 'styled-components'

export const SearchBar = styled.div`
  width: 100%;
  display: flex;
  height: 250px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const SearchBarInput = styled.input`
  margin: 0 auto;
  padding: 10px;
  border: none;
  font-family: 'Josefin Sans', sans-serif;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 20px;
  width: 20%;
  color: black;
  height: 30px;

  ::-webkit-input-placeholder {
    text-align: center;
  }

  :-moz-placeholder {
    /* Firefox 18- */
    text-align: center;
  }

  ::-moz-placeholder {
    /* Firefox 19+ */
    text-align: center;
  }

  :-ms-input-placeholder {
    text-align: center;
  }
`

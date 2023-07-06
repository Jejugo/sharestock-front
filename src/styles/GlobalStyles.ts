import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Metropolis Light';
    src: url('./fonts/metropolis.light.otf') format('opentype');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  body,
  html {
    margin: 0;
    color: white;
    background-color: #151515;
    font-family: 'Metropolis Light', sans-serif;
    line-height: 3vh;
  }
`

export default GlobalStyle

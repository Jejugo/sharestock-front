import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  body,
  html {
    margin: 0;
    color: white;
    background-color: #3a3a3a;
    font-family: 'Metropolis Light', sans-serif;
    line-height: 3vh;
  }

  .fade-enter {
    opacity: 0;
  }
  
  .fade-enter-active {
    opacity: 1;
    transition: opacity 500ms;
  }
  
  .fade-exit {
    opacity: 1;
  }
  
  .fade-exit-active {
    opacity: 0;
    transition: opacity 500ms;
  }
`

export default GlobalStyle

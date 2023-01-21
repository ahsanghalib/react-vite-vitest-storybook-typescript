/* c8 ignore start */

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Material Icons Round';
    font-style: normal;
    font-weight: 400;
    src: url(/fonts/material-icon-rounded.otf) format('opentype');
  }

  * {
    -webkit-text-size-adjust: 100%;
  }

  html {
    height: 100%;
    margin: 0;
    font-family: Poppins, Lato, Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scrollbar-color: #009cfe rgba(100, 100, 100, 0.5) !important;
    scrollbar-width: unset;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #151515;
  }

  body,
  #root {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: #151515;
    color: #fff; // TODO: to be removed.
  }

  div {
    scrollbar-color: #009cfe rgba(100, 100, 100, 0.5) !important;
    scrollbar-width: unset;
  }

  ::-webkit-scrollbar {
    width: 1.2em;
    height: 1.2em;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(100, 100, 100, 0.5);
  }

  ::-webkit-scrollbar-thumb {
    border: 0.425em solid transparent;
    border-radius: 0.625em;
    background-color: #009cfe !important;
    background-clip: content-box;
    -webkit-background-clip: content-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #009cfe !important;
    background-clip: border-box;
    -webkit-background-clip: border-box;
  }
`;

/* c8 ignore stop */

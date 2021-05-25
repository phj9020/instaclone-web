import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

// Define Theme 
export const lightTheme = {
    fontColor: "#2c2c2c",
    bgColor: "white"
};

export const darkTheme = {
    fontColor: "white",
    bgColor: "#2c2c2c"
};

export const GlobalStyle = createGlobalStyle`
    ${reset}
  /* other styles */
    * { 
        box-sizing: border-box;
    }
    input {
        all: unset;
    }
    body {
        background-color: #FAFAFA;
        font-size: 14px;
        font-family: 'Open Sans', sans-serif;
    }
    a {
        text-decoration: none;
    }
`
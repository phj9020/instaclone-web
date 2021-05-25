import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

// Define Theme 
export const lightTheme = {
    accent: "#0095f6",
    borderColor: "rgb(219, 219, 219)",
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
        background-color: #fafafa;
        font-size: 14px;
        font-family: 'Open Sans', sans-serif;
        color: rgb(38,38,38);
    }
    a {
        text-decoration: none;
        margin-left: 5px;
        font-weight: 600;
    }
`
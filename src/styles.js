import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

// Define Theme 
export const lightTheme = {
    accent: "#0095f6",
    fontColor: "rgb(38,38,38)",
    bgColor: "#fafafa",
    borderColor: "rgb(219, 219, 219)",
    boxColor: "white",
    warningColor: "red",
    termsColor: "rgb(142, 142, 142)",
};

export const darkTheme = {
    accent: "#c395fe",
    fontColor: "#faf7ff",
    bgColor: "#474747",
    borderColor: "rgb(205, 217, 229)",
    boxColor: "#727272",
    warningColor: "#ff6F00",
    termsColor: "white",
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
        background-color: ${props => props.theme.bgColor};
        font-size: 14px;
        font-family: 'Open Sans', sans-serif;
        color: ${props => props.theme.fontColor};
    }
    a {
        text-decoration: none;
        margin-left: 5px;
        font-weight: 600;
    }
`
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

// Define Theme 
export const lightTheme = {
    fontColor: "#2c2c2c",
    bgColor: "lightGray"
};

export const darkTheme = {
    fontColor: "lightGray",
    bgColor: "#2c2c2c"
};

export const GlobalStyle = createGlobalStyle`
    ${reset}
  /* other styles */
    body {
        background-color: ${(props) => props.theme.bgColor};
        color: ${(props) => props.theme.fontColor};
    }
`
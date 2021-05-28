import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

const TOKEN = 'token';
const DARK_MODE = "darkmode";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token) => {
    // save token 
    localStorage.setItem(TOKEN, token);
    // log user in
    isLoggedInVar(true);
}

export const logUserOut = () => {
    // remove token 
    localStorage.removeItem(TOKEN);
    // log user out
    isLoggedInVar(false);
}

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const enableDarkMode = ()=> {
    localStorage.setItem(DARK_MODE, "enabled");
    darkModeVar(true);
}

export const disableDarkMode = ()=> {
    localStorage.removeItem(DARK_MODE);
    darkModeVar(false);
}

export const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

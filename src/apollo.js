import { ApolloClient, InMemoryCache, makeVar, createHttpLink,  } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";

const TOKEN = 'token';
const DARK_MODE = "darkmode";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token) => {
    // save token 
    localStorage.setItem(TOKEN, token);
    // log user in
    isLoggedInVar(true);
}

export const logUserOut = (history) => {
    // remove token 
    localStorage.removeItem(TOKEN);
    // log user out
    isLoggedInVar(false);
    // clear state in location.state
    if(history) {
        history.replace();
    }
    window.location.reload();
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

// put token in headders 
const httpLink = createHttpLink({
    uri: process.env.NODE_ENV === 'production' ? 
    "https://phj9020-instaclone-backend.herokuapp.com/graphql" : 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
        headers: {
        ...headers,
        token: localStorage.getItem(TOKEN),
        }
    }
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            //변경하고자 하는 타입의 이름 USER
            User:{
                keyFields: (obj)=> `User:${obj.username}`,
            }
        }
    }),
    connectToDevTools: true,
});

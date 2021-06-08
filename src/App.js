import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./screen/Home";
import Login from "./screen/Login";
import NotFound from "./screen/NotFound";
import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar,darkModeVar } from './apollo';
import { ThemeProvider } from 'styled-components';
import {lightTheme, darkTheme, GlobalStyle} from "./styles";
import Signup from './screen/Signup';
import routes from "./routes";
import { HelmetProvider } from 'react-helmet-async';
import { ApolloProvider } from '@apollo/client/react';
import {client} from "./apollo";
import Layout from './components/Layout';
import Profile from './screen/Profile';


function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyle />
          <Router>
            <Switch>
              <Route path={routes.home} exact>
                {isLoggedIn ? <Layout><Home /></Layout> : <Login />}
              </Route>
              {!isLoggedIn ?
                <Route path={routes.signUp}>
                  <Signup />
                </Route>
                :
                null
              }
              <Route path="/users/:username" >
                <Layout>
                  <Profile />
                </Layout>
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;

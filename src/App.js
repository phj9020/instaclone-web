import React from 'react';
import {HashRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./screen/Home";
import Login from "./screen/Login";
import NotFound from "./screen/NotFound";
import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar,darkModeVar } from './apollo';
import { ThemeProvider } from 'styled-components';
import {lightTheme, darkTheme, GlobalStyle} from "./styles";



function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? <Home /> : <Login />}
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;

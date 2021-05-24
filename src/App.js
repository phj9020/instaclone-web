import React from 'react';
import {HashRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./screen/Home";
import Login from "./screen/Login";
import NotFound from "./screen/NotFound";
import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar,darkModeVar } from './apollo';
import { ThemeProvider } from 'styled-components';

const lightTheme = {
  fontColor: "#2c2c2c",
  bgColor: "lightGray"
};

const darkTheme = {
  fontColor: "lightGray",
  bgColor: "#2c2c2c"
};


function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
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

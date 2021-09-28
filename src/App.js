import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Search from "./pages/Search/index";
import History from "./pages/History/index";

import './App.css';

function App() {

  return (
    <Router>
      <div>
        <Switch>

        <Route  exact path={["/", "/search"]}>
            <Search />
          </Route>

        <Route path={["/history"]}>
            <History />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;


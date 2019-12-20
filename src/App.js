import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route component={Dashboard} exact path="/" />
        <Route component={Form} path="/add" />
        <Route component={Form} path="/edit/:id" />
      </Switch>
    </div>
  );
  // * No clue if these are right * //
}

export default App;
